import RekaButton from "@/components/ui/RekaButton";
import { getLocale } from "@/lib/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl text-center flex flex-col items-center">
        <span className="font-mono text-sm tracking-widest text-accent font-semibold uppercase mb-4">
          [Error 404]
        </span>
        <h1 className="display-xl font-bold tracking-tighter text-foreground mb-6">
          {locale === "id" ? "HALAMAN TIDAK DITEMUKAN." : "THIS PAGE WENT SOMEWHERE ELSE."}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
          {locale === "id"
            ? "Koordinat yang Anda minta tidak tersedia dalam arsitektur digital kami atau telah dipindahkan ke sistem baru."
            : "The requested coordinate does not exist in our digital architecture or has been moved to a new system."}
        </p>
        <RekaButton href="/" variant="primary" size="lg" arrow="right">
          {locale === "id" ? "KEMBALI KE BERANDA" : "RETURN TO HOME"}
        </RekaButton>
      </div>
    </div>
  );
}
