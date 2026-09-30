"use client";

import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface TerminalLine {
  text: string;
  delay?: number;
  color?: string;
}

export interface TabContent {
  label: string;
  command: string;
  lines: TerminalLine[];
}

interface TerminalAnimationContextValue {
  tabs: TabContent[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  typedCommand: string;
  visibleLines: number;
  commandComplete: boolean;
  hideCursorOnComplete: boolean;
}

const TerminalAnimationContext = createContext<TerminalAnimationContextValue | null>(null);

function useTerminalAnimation() {
  const context = useContext(TerminalAnimationContext);
  if (!context) throw new Error("Terminal animation primitives must be inside TerminalAnimationRoot.");
  return context;
}

interface RootProps {
  tabs: TabContent[];
  defaultActiveTab?: number;
  activeTab?: number;
  onActiveTabChange?: (index: number) => void;
  backgroundImage?: string;
  alwaysDark?: boolean;
  hideCursorOnComplete?: boolean;
  className?: string;
  children: ReactNode;
}

export function TerminalAnimationRoot({
  tabs,
  defaultActiveTab = 0,
  activeTab: controlledTab,
  onActiveTabChange,
  backgroundImage,
  alwaysDark = false,
  hideCursorOnComplete = false,
  className = "",
  children,
}: RootProps) {
  const [uncontrolledTab, setUncontrolledTab] = useState(defaultActiveTab);
  const activeTab = controlledTab ?? uncontrolledTab;
  const setActiveTab = (index: number) => {
    if (controlledTab === undefined) setUncontrolledTab(index);
    onActiveTabChange?.(index);
  };
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [commandComplete, setCommandComplete] = useState(false);
  const currentTab = tabs[activeTab];

  useEffect(() => {
    if (!currentTab) return;
    let timer: ReturnType<typeof setTimeout>;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let characterIndex = 0;

    const typeNextCharacter = () => {
      characterIndex += 1;
      setTypedCommand(currentTab.command.slice(0, characterIndex));
      if (characterIndex < currentTab.command.length) {
        timer = setTimeout(typeNextCharacter, 24);
        return;
      }
      setCommandComplete(true);

      let elapsed = 180;
      currentTab.lines.forEach((line, index) => {
        elapsed += line.delay ?? 180;
        timers.push(setTimeout(() => setVisibleLines(index + 1), elapsed));
      });
    };

    timer = setTimeout(() => {
      setTypedCommand("");
      setVisibleLines(0);
      setCommandComplete(false);
      timer = setTimeout(typeNextCharacter, 250);
    }, 0);
    return () => {
      clearTimeout(timer);
      timers.forEach(clearTimeout);
    };
  }, [currentTab]);

  return (
    <TerminalAnimationContext.Provider
      value={{ tabs, activeTab, setActiveTab, typedCommand, visibleLines, commandComplete, hideCursorOnComplete }}
    >
      <div
        className={`relative isolate overflow-hidden rounded-xl ${alwaysDark ? "dark" : ""} ${className}`}
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.34), rgba(10, 10, 12, 0.62)), url("${backgroundImage}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        } : undefined}
      >
        {children}
      </div>
    </TerminalAnimationContext.Provider>
  );
}

export function TerminalAnimationBackgroundGradient() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-fuchsia-500/15" />;
}

export function TerminalAnimationBlinkingCursor() {
  return <span className="inline-block h-[1em] w-[0.55em] animate-caret-blink bg-current align-[-0.12em]" aria-hidden="true" />;
}

export function TerminalAnimationTrailingPrompt({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}

export function TerminalAnimationContainer({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`w-full ${className}`} {...props}>{children}</div>;
}

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
  minHeight?: string;
  animateOnVisible?: boolean;
}

export function TerminalAnimationWindow({
  minHeight = "28rem",
  animateOnVisible = true,
  className = "",
  children,
  style,
  ...props
}: WindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/10 bg-[#111113]/75 text-zinc-100 shadow-sm backdrop-blur-sm ${animateOnVisible ? "animate-in fade-in slide-in-from-bottom-2 duration-500" : ""} ${className}`}
      style={{ minHeight, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function TerminalAnimationContent({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 sm:p-5 ${className}`} {...props}>{children}</div>;
}

export function TerminalAnimationCommandBar({
  className = "",
  cursor,
}: {
  className?: string;
  cursor?: ReactNode;
}) {
  const { typedCommand, commandComplete, hideCursorOnComplete } = useTerminalAnimation();
  return (
    <div className={`flex min-h-6 items-center gap-2 text-zinc-200 ${className}`}>
      <span className="select-none text-red-400" aria-hidden="true">$</span>
      <span>{typedCommand}</span>
      {!(hideCursorOnComplete && commandComplete) && (cursor ?? <span className="inline-block h-4 w-2 animate-caret-blink bg-red-400" aria-hidden="true" />)}
    </div>
  );
}

export function TerminalAnimationOutput({
  className = "",
  renderLine,
}: {
  className?: string;
  renderLine?: (line: TerminalLine, index: number, visible: boolean) => ReactNode;
}) {
  const { tabs, activeTab, visibleLines } = useTerminalAnimation();
  return (
    <div
      id={`terminal-output-${activeTab}`}
      role="tabpanel"
      aria-labelledby={`terminal-tab-${activeTab}`}
      className={`mt-3 min-h-24 font-mono text-xs leading-relaxed sm:text-sm ${className}`}
      aria-live="polite"
    >
      {tabs[activeTab]?.lines.map((line, index) => {
        const visible = index < visibleLines;
        if (!visible) return null;
        return renderLine
          ? <div key={`${activeTab}-${index}`}>{renderLine(line, index, visible)}</div>
          : <div key={`${activeTab}-${index}`} className={line.color ?? "text-zinc-400"}>{line.text}</div>;
      })}
    </div>
  );
}

export function TerminalAnimationTabList({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div role="tablist" className={className}>{children}</div>;
}

export function TerminalAnimationTabTrigger({
  index,
  children,
  className = "",
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const { tabs, activeTab, setActiveTab } = useTerminalAnimation();
  const selected = index === activeTab;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-state={selected ? "active" : "inactive"}
      aria-controls={`terminal-output-${index}`}
      id={`terminal-tab-${index}`}
      onClick={() => setActiveTab(index)}
      className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${selected ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"} ${className}`}
    >
      {children ?? tabs[index]?.label}
    </button>
  );
}
