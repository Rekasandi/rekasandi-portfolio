import RekaButton from "@/components/ui/RekaButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-xl text-center flex flex-col items-center">
        <span className="font-mono text-sm tracking-widest text-[#0a0a0a] font-semibold uppercase mb-4">
          [Error 404]
        </span>
        <h1 className="display-xl font-bold tracking-tighter mb-6">
          THIS PAGE WENT SOMEWHERE ELSE.
        </h1>
        <p className="text-[#55544e] text-lg leading-relaxed mb-10 max-w-md">
          The requested coordinate does not exist in our digital architecture or has been moved to a new system.
        </p>
        <RekaButton href="/" variant="primary" size="lg" arrow="right">
          RETURN TO HOME
        </RekaButton>
      </div>
    </div>
  );
}
