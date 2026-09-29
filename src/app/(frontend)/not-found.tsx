import RekaButton from "@/components/ui/RekaButton";
import { getLocale } from "@/lib/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl text-center flex flex-col items-center">
        <span className="font-mono text-sm tracking-widest text-accent font-semibold  mb-4">
          Error 404
        </span>
        <h1 className="display-xl font-bold tracking-tighter text-foreground mb-6">
          {locale === "id" ? "Halaman tidak ditemukan." : "This page could not be found."}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
          {locale === "id"
            ? "Halaman mungkin sudah dipindahkan atau alamatnya keliru."
            : "This page may have moved, or the address may be incorrect."}
        </p>
        <RekaButton href="/" variant="primary" size="lg" arrow="right">
          {locale === "id" ? "Kembali ke beranda" : "Return to home"}
        </RekaButton>
      </div>
    </div>
  );
}
