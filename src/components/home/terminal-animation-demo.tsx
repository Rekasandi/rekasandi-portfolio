"use client";

import { cn } from "@/lib/utils";
import {
  TerminalAnimationBackgroundGradient,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TabContent,
  type TerminalLine,
} from "@/components/ui/terminal-animation";

const backgroundImage = "/images/terminal-animation-bg-2.png";

const tabs: TabContent[] = [
  {
    label: "install",
    command: "npm install",
    lines: [
      { text: "", delay: 80 },
      { text: "added 1,247 packages in 12s", color: "text-[#6FF7CC]", delay: 400 },
      { text: "", delay: 80 },
      { text: "Cult UI is looking for funding", color: "text-slate-400", delay: 150 },
      { text: "run `npm fund` for details", color: "text-slate-500", delay: 100 },
      { text: "found 0 vulnerabilities", color: "text-[#ADFA1F]", delay: 250 },
    ],
  },
  {
    label: "build",
    command: "npm run build",
    lines: [
      { text: "", delay: 80 },
      { text: "▲ Next.js 16.1.6", color: "text-slate-300", delay: 300 },
      { text: "", delay: 80 },
      { text: "Creating an optimized production build...", color: "text-slate-400", delay: 250 },
      { text: "✓ Compiled successfully", color: "text-[#6FF7CC]", delay: 200 },
      { text: "✓ Linting and checking validity of types", color: "text-[#6FF7CC]", delay: 150 },
      { text: "✓ Generating static pages (12/12)", color: "text-[#6FF7CC]", delay: 150 },
      { text: "Route (app) / 142 kB | First Load JS 198 kB", color: "text-slate-500", delay: 150 },
      { text: "Route (app) /work 61 kB | First Load JS 57 kB", color: "text-slate-500", delay: 150 },
      { text: "Route (app) /about 75 kB | First Load JS 92 kB", color: "text-slate-500", delay: 150 },
      { text: "", delay: 80 },
      { text: "✓ Build completed in 4.2s", color: "text-[#6FF7CC]", delay: 300 },
    ],
  },
  {
    label: "deploy",
    command: "vercel deploy --prod",
    lines: [
      { text: "", delay: 80 },
      { text: "Vercel CLI 39.2.0", color: "text-slate-400", delay: 200 },
      { text: "", delay: 80 },
      { text: "> Deploying to production...", color: "text-[#ED42B5]", delay: 300 },
      { text: "", delay: 80 },
      { text: "✓ Building", color: "text-[#6FF7CC]", delay: 250 },
      { text: "✓ Uploading", color: "text-[#6FF7CC]", delay: 200 },
      { text: "✓ Finalizing", color: "text-[#6FF7CC]", delay: 200 },
      { text: "Production deployment ready", color: "text-[#ED42B5]", delay: 400 },
      { text: "✓ Deployment complete", color: "text-[#6FF7CC]", delay: 250 },
    ],
  },
  {
    label: "test",
    command: "npm test",
    lines: [
      { text: "", delay: 80 },
      { text: "PASS src/components/Button.test.tsx", color: "text-slate-400", delay: 200 },
      { text: "✓ renders correctly", color: "text-[#ADFA1F]", delay: 100 },
      { text: "✓ handles click events", color: "text-[#ADFA1F]", delay: 100 },
      { text: "PASS src/utils/format.test.ts", color: "text-slate-400", delay: 150 },
      { text: "✓ formats currency and dates", color: "text-[#ADFA1F]", delay: 100 },
      { text: "", delay: 80 },
      { text: "Test Suites: 2 passed, 2 total", color: "text-[#ADFA1F]", delay: 200 },
      { text: "Tests: 4 passed, 4 total", color: "text-[#ADFA1F]", delay: 150 },
      { text: "Time: 1.234 s", color: "text-slate-500", delay: 100 },
    ],
  },
];

export default function TerminalAnimationDemo() {
  return (
    <TerminalAnimationRoot
      alwaysDark
      backgroundImage={backgroundImage}
      className="relative flex w-full justify-center overflow-clip bg-background"
      defaultActiveTab={1}
      hideCursorOnComplete={false}
      tabs={tabs}
    >
      {!backgroundImage && <TerminalAnimationBackgroundGradient />}
      <TerminalAnimationContainer className="w-full max-w-[43rem] px-3 py-5 sm:px-6 sm:py-6">
        <TerminalAnimationWindow
          minHeight="26rem"
          className="border-white/30 bg-[#171719]/95 outline outline-1 outline-offset-2 outline-white/20"
        >
          <TerminalAnimationContent className="min-h-[26rem] px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
            <div className="flex items-center gap-2 leading-relaxed">
              <span className="select-none font-mono text-[10px] text-muted-foreground md:text-sm" aria-hidden="true">$</span>
              <TerminalAnimationCommandBar
                className="font-mono text-[10px] text-foreground md:text-sm"
                cursor={<TerminalAnimationBlinkingCursor />}
              />
            </div>

            <TerminalAnimationOutput
              className="mt-2 min-h-[18rem]"
              renderLine={(line: TerminalLine, _index: number, visible: boolean) => {
                if (!visible) return null;
                return (
                  <div className="leading-relaxed">
                    <span className={cn("font-mono text-[10px] md:text-sm", line.color ?? "text-muted-foreground")}>
                      {line.text || "\u00A0"}
                    </span>
                  </div>
                );
              }}
            />
            <TerminalAnimationTrailingPrompt className="mt-1 flex items-center gap-2 leading-relaxed">
              <span className="select-none font-mono text-sm text-muted-foreground" aria-hidden="true">$</span>
              <TerminalAnimationBlinkingCursor />
            </TerminalAnimationTrailingPrompt>
          </TerminalAnimationContent>

          <div className="flex justify-center px-3 pb-5 sm:pb-6">
            <TerminalAnimationTabList className="inline-flex items-center gap-0 rounded-lg border border-white/15 bg-black/35 px-1 py-1">
              {tabs.map((tab, index) => (
                <TerminalAnimationTabTrigger
                  className="px-2 py-1 font-mono text-[10px] data-[state=active]:bg-white data-[state=active]:font-medium data-[state=active]:text-black data-[state=inactive]:text-white/55 data-[state=inactive]:hover:text-white sm:px-3.5 sm:text-sm"
                  index={index}
                  key={tab.label}
                >
                  {tab.label}
                </TerminalAnimationTabTrigger>
              ))}
            </TerminalAnimationTabList>
          </div>
        </TerminalAnimationWindow>
      </TerminalAnimationContainer>
    </TerminalAnimationRoot>
  );
}
