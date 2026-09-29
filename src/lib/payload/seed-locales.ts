import type { Payload } from "payload";
import { TESTIMONIALS } from "@/data/team";
import { PROJECTS } from "@/data/projects";
import { translateProjectBlocksToIndonesian } from "./project-locales-id";
import {
  getAboutPageContent,
  getHomePageContent,
  getServicesPageContent,
} from "./queries";

const serviceTranslations: Record<string, {
  title: string;
  shortDescription: string;
  capabilities: [string, string][];
  deliverables: string[];
}> = {
  "digital-products": {
    title: "Produk digital",
    shortDescription: "Rencanakan dan bangun produk untuk pelanggan maupun alat kerja internal, dari perumusan hingga peluncuran.",
    capabilities: [
      ["Perumusan produk", "Menetapkan tujuan, pengguna, dan cakupan produk."],
      ["Riset pengguna dan alur kerja", "Memahami kebutuhan pengguna dan menyusun alur yang jelas."],
      ["Sistem desain", "Membangun komponen dan aturan visual yang dapat digunakan kembali."],
      ["Rekayasa aplikasi web", "Mengembangkan aplikasi web untuk kebutuhan produk."],
      ["Alur onboarding", "Membantu pengguna memahami dan mulai menggunakan produk."],
    ],
    deliverables: ["Perencanaan produk dan kebutuhan", "Wireframe dan prototipe interaktif", "Desain antarmuka produk", "Aplikasi web siap produksi", "Deployment dan pengaturan analitik"],
  },
  "web-experiences": {
    title: "Pengalaman web",
    shortDescription: "Rancang dan bangun situs yang cepat dan mudah diakses, agar layanan kompleks lebih mudah dipahami.",
    capabilities: [
      ["Identitas visual dan tata letak halaman", "Menyusun tampilan dan struktur halaman sesuai kebutuhan brand."],
      ["Interaksi scroll dan hover", "Memberi umpan balik yang jelas pada interaksi pengguna."],
      ["Tipografi responsif", "Menjaga keterbacaan dan hierarki di berbagai ukuran layar."],
      ["Dukungan keyboard dan pembaca layar", "Memastikan konten dapat digunakan dengan teknologi bantu."],
      ["Pola situs yang mudah diakses", "Menerapkan pola antarmuka yang mendukung beragam pengguna."],
    ],
    deliverables: ["Arahan visual situs", "Tipografi dan skala huruf", "Desain gerak dan interaksi", "Integrasi CMS", "Pemeriksaan hosting, aksesibilitas, dan performa"],
  },
  "custom-software": {
    title: "Software khusus",
    shortDescription: "Ganti proses manual dan alat yang terpisah dengan software yang mengikuti cara kerja tim Anda.",
    capabilities: [
      ["Arsitektur layanan dan event", "Menyusun layanan dan alur event sesuai kebutuhan sistem."],
      ["Dashboard dan visualisasi data", "Menyajikan data operasional agar mudah dipantau."],
      ["Performa dan indeks database", "Mengatur query dan indeks untuk akses data yang efisien."],
      ["Integrasi pihak ketiga", "Menghubungkan sistem dengan layanan yang sudah digunakan."],
      ["Pengujian unit dan end-to-end", "Memeriksa fungsi aplikasi dari komponen hingga alur pengguna."],
    ],
    deliverables: ["Arsitektur sistem dan skema data", "API REST dan GraphQL", "Koneksi data real-time", "Kontrol akses berbasis peran", "Deployment otomatis dan pengaturan cloud"],
  },
  "ai-automation": {
    title: "AI dan otomatisasi",
    shortDescription: "Gunakan AI untuk kebutuhan spesifik, seperti pencarian informasi, pemrosesan dokumen, dan otomatisasi tugas berulang.",
    capabilities: [
      ["Retrieval-Augmented Generation (RAG)", "Mengambil informasi dari sumber data yang relevan sebelum menghasilkan jawaban."],
      ["Perutean tugas berbantuan AI", "Mengarahkan permintaan ke alur atau layanan yang sesuai."],
      ["Pemrosesan dokumen", "Mengekstrak dan mengolah informasi dari dokumen."],
      ["Deteksi anomali", "Menandai pola data yang menyimpang untuk ditinjau."],
      ["Kontrol data dan pengamanan model", "Membatasi akses dan memberi pengawasan pada keluaran model."],
    ],
    deliverables: ["Tinjauan use case dan kelayakan AI", "Pencarian informasi internal", "Otomatisasi alur kerja dengan model AI", "Evaluasi model", "Respons streaming dan kontrol pengguna"],
  },
  "mobile-applications": {
    title: "Aplikasi mobile",
    shortDescription: "Bangun aplikasi iOS dan Android untuk layanan yang membutuhkan pengalaman mobile yang praktis dan andal.",
    capabilities: [
      ["Pengembangan aplikasi lintas platform", "Membangun aplikasi iOS dan Android dari basis kode bersama."],
      ["Autentikasi biometrik", "Mendukung autentikasi melalui fitur biometrik perangkat."],
      ["Notifikasi push dan deep link", "Menghubungkan notifikasi dengan tujuan yang tepat di aplikasi."],
      ["Pembayaran dalam aplikasi", "Mengintegrasikan alur pembayaran sesuai kebutuhan produk."],
      ["Optimalisasi performa dan memori", "Menjaga aplikasi tetap responsif dan menggunakan sumber daya secara efisien."],
    ],
    deliverables: ["Alur pengguna mobile", "Aplikasi iOS dan Android", "Interaksi sentuh, gestur, dan haptik", "Dukungan offline sesuai kebutuhan", "Pengajuan ke App Store dan Google Play"],
  },
};

const postTranslations: Record<string, { title: string; excerpt: string; readingTime: string; body: string }> = {
  "engineering-clarity-ai-era": {
    title: "Kejelasan rekayasa di era AI",
    excerpt: "Saat AI generatif memudahkan pembuatan kode dan teks, keunggulan produk semakin ditentukan oleh kualitas visual, hierarki informasi, dan kemudahan penggunaan.",
    readingTime: "5 menit baca",
    body: [
      "AI kini dapat menghasilkan ribuan baris kode dalam hitungan detik. Namun, banyak produk digital masih terasa padat dan serupa. Kecepatan produksi saja tidak membuat sebuah produk lebih mudah dipahami atau digunakan.",
      "Kemajuan AI justru membuat keputusan desain semakin penting. Saat banyak tim dapat membuat chatbot atau dashboard dengan cepat, produk yang jelas dan terarah lebih mudah dibedakan. Tipografi, susunan informasi, dan ritme interaksi membantu pengguna memahami apa yang perlu dilakukan.",
      "Antarmuka perusahaan sering memuat terlalu banyak filter dan kartu dengan tampilan seragam. Hierarki yang baik memberi ruang pada informasi penting dan menampilkan detail tambahan saat pengguna membutuhkannya.",
      "Produk digital yang berguna bukan produk dengan tombol terbanyak. Produk yang baik menyampaikan informasi dengan jelas, membantu pengguna mengambil keputusan, dan tetap mudah digunakan saat kebutuhan bertambah.",
    ].join("\n\n"),
  },
  "mathematics-of-motion": {
    title: "Merancang gerak yang terasa tepat di web",
    excerpt: "Animasi bukan sekadar hiasan. Gerak yang dirancang dengan baik memberi umpan balik, menjaga konteks ruang, dan membantu pengguna memahami perubahan antarmuka.",
    readingTime: "6 menit baca",
    body: [
      "Ada perbedaan antara situs yang sekadar bergerak dan situs yang terasa dirancang dengan baik. Gerakan yang berlebihan mengalihkan perhatian. Gerakan yang terarah membantu pengguna memahami perubahan dan tetap mengetahui posisi mereka.",
      "Saat merancang animasi untuk situs Rekasandi, kami menetapkan beberapa prinsip agar gerak tetap berguna:",
      "Pertama, animasi tidak boleh menghambat interaksi. Setelah pengguna menekan tombol atau berpindah halaman, antarmuka harus tetap responsif.",
      "Kedua, hormati preferensi aksesibilitas. Gerakan besar dan scrolling halus perlu dikurangi saat sistem pengguna mengaktifkan prefers-reduced-motion.",
      "Ketiga, pilih alat sesuai kebutuhan. Framer Motion menangani interaksi komponen, GSAP ScrollTrigger menangani animasi berbasis scroll, dan scrolling bawaan browser menjaga navigasi tetap alami.",
      "Dengan prinsip ini, gerak bukan sekadar dekorasi. Gerak menjadi bagian dari cara produk memberi informasi dan merespons tindakan pengguna.",
    ].join("\n\n"),
  },
  "architecture-of-scale": {
    title: "Membangun sistem desain untuk banyak brand",
    excerpt: "Library UI siap pakai tidak selalu cukup untuk banyak aplikasi. Token desain yang terstruktur membantu tim menjaga konsistensi tanpa menghilangkan identitas setiap produk.",
    readingTime: "7 menit baca",
    body: [
      "Banyak tim engineering memulai dengan library UI populer karena dapat mempercepat pekerjaan awal. Tantangan muncul ketika bisnis mengelola beberapa brand, produk lokal, dan alat operasional dengan kebutuhan berbeda.",
      "Override gaya menumpuk, pembaruan dependensi dapat merusak penyesuaian, dan pola aksesibilitas menjadi tidak konsisten antar-repositori. Alat yang awalnya mempercepat kerja bisa berubah menjadi beban pemeliharaan.",
      "Solusinya bukan membuat setiap tombol dari awal atau menerima tampilan template apa adanya. Tim perlu memisahkan token desain dari struktur komponen.",
      "Dengan memisahkan warna, jarak, dan tipografi dari komponen dasar, desainer dapat menjaga identitas visual. Engineer tetap mengendalikan aksesibilitas, perilaku komponen, dan kontrak tipe.",
      "Struktur ini membantu tim mengembangkan banyak produk tanpa kehilangan konsistensi maupun kendali atas kebutuhan masing-masing brand.",
    ].join("\n\n"),
  },
};

const teamTranslations: Record<string, { role: string; specialization: string; bio: string; location: string }> = {
  "Sandi Gustam": {
    role: "Pendiri dan direktur studio",
    specialization: "Arsitektur produk dan arahan kreatif",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Memimpin visi arsitektur dan arahan kreatif Rekasandi. Berpengalaman lebih dari 10 tahun mengubah sistem teknis yang kompleks menjadi produk digital.",
  },
  "Reza Pratama": {
    role: "Kepala teknologi kreatif",
    specialization: "Desain gerak dan rekayasa frontend",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Berfokus pada desain gerak, interaksi WebGL, dan interaksi mikro. Merancang antarmuka yang responsif dan nyaman digunakan.",
  },
  "Dian Nugroho": {
    role: "Arsitek sistem utama",
    specialization: "Sistem terdistribusi dan arsitektur cloud",
    location: "Bandung, Indonesia (WIB, UTC+7)",
    bio: "Berfokus pada backend terdistribusi, pemantauan cloud, dan pipeline data real-time menggunakan AWS dan PostgreSQL.",
  },
  "Maya Kartika": {
    role: "Desainer produk utama",
    specialization: "Sistem desain dan UI/UX editorial",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Merancang hierarki tipografi, token untuk berbagai brand, dan alur kerja yang mudah dipahami untuk produk perusahaan dan fintech.",
  },
  "Mella Sinta": {
    role: "Penulis teknis & QA",
    specialization: "Penulisan teknis",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Menangani analisis kebutuhan, dokumentasi sistem, spesifikasi teknis, dan pengujian aplikasi.",
  },
  "Nasra Indah": {
    role: "Analis bisnis & pemasaran",
    specialization: "Analisis bisnis",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Menganalisis tren pasar TI, mengevaluasi proses bisnis digital, serta menyusun strategi komersial dan kemitraan.",
  },
  "Ahmad Habibi": {
    role: "Insinyur mobile & UI senior",
    specialization: "Rekayasa aplikasi mobile",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Mengembangkan aplikasi mobile lintas platform, meningkatkan performa, dan merancang arsitektur aplikasi mobile.",
  },
  "Efron Paduansi": {
    role: "Insinyur backend senior",
    specialization: "Rekayasa backend",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Berfokus pada microservices, optimalisasi database, dan sistem API berkapasitas tinggi.",
  },
  "Rizqi Fauzan": {
    role: "Manajer proyek",
    specialization: "Rekayasa perangkat lunak",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Berfokus pada desain sistem, strategi infrastruktur, arsitektur microservices backend, dan kepemimpinan untuk kebutuhan proyek.",
  },
  "Gustam Mahendra": {
    role: "Konsultan & insinyur perangkat lunak",
    specialization: "Rekayasa perangkat lunak",
    location: "Jakarta, Indonesia (WIB, UTC+7)",
    bio: "Berfokus pada arsitektur solusi, strategi teknis, dan rekayasa perangkat lunak full-stack.",
  },
};

const mediaTranslations: Record<string, { alt: string; caption: string; credit: string }> = {
  "aether-ai.jpg": {
    alt: "Antarmuka platform AI Aether",
    caption: "Dashboard alur kerja AI Aether",
    credit: "Rekasandi",
  },
  "kroma-design-system.jpg": {
    alt: "Antarmuka sistem desain Kroma",
    caption: "Komponen dan token desain Kroma",
    credit: "Rekasandi",
  },
  "volta-fleet-os.jpg": {
    alt: "Dashboard operasi armada Volta",
    caption: "Telemetri dan perutean armada Volta",
    credit: "Rekasandi",
  },
  "nexa-pay.svg": {
    alt: "Dashboard penyelesaian pembayaran Nexa Pay",
    caption: "Visual konsep treasury Nexa Pay",
    credit: "Rekasandi",
  },
};

const testimonialTranslations: Record<string, { quote: string; role: string }> = {
  "Marcus Vance": {
    quote: "Rekasandi tidak hanya membangun software untuk kami. Tim mereka membantu mengubah cara tim global kami mengakses informasi perusahaan. Perhatian mereka pada gerak, tipografi, dan kecepatan sangat terasa.",
    role: "Chief Technology Officer",
  },
  "Elena Rostova": {
    quote: "Sistem desain dari Rekasandi membantu tim kami menggunakan komponen dan pola visual yang konsisten. Tim kini memiliki dasar yang lebih jelas untuk mengembangkan produk.",
    role: "VP of Product Experience",
  },
  "Hendrik Van Der Meer": {
    quote: "Volta OS menjadi pusat informasi operasional armada kami. Platform ini membantu operator memahami kondisi armada dan mempelajari alur kerja baru dengan lebih cepat.",
    role: "Direktur Operasional Global",
  },
};

const projectTranslations: Record<string, { title: string; tagline: string; summary: string }> = {
  "aether-ai": {
    title: "Platform AI Aether",
    tagline: "Orkestrasi dan penalaran otomatis untuk perusahaan",
    summary: "Platform AI bagi tim perusahaan untuk mencari informasi internal dan mengelola alur kerja berbantuan AI.",
  },
  "kroma-design-system": {
    title: "Sistem desain multi-brand Kroma",
    tagline: "Arsitektur komponen dan ekosistem token desain",
    summary: "Sistem desain dan library komponen bersama untuk tim yang mengelola beberapa produk web.",
  },
  "volta-fleet-os": {
    title: "Sistem operasi armada Volta",
    tagline: "Telemetri real-time dan infrastruktur logistik otomatis",
    summary: "Antarmuka operasional armada yang menggabungkan telemetri kendaraan, perutean, dan alat dispatch.",
  },
  "nexa-pay": {
    title: "Fintech lintas negara Nexa",
    tagline: "Ekosistem keuangan multi-mata uang yang praktis",
    summary: "Produk pembayaran mobile untuk transfer lintas negara, rekening multi-mata uang, dan kartu virtual.",
  },
};

export async function seedIndonesianContent(payload: Payload) {
  const home = await getHomePageContent("id", true);
  await payload.updateGlobal({
    slug: "page-home",
    locale: "id",
    data: {
      heroHeadlineLine1: home.heroHeadlineLine1,
      heroSubtitle: home.heroSubtitle,
      introTitle: home.introTitle,
      introDescription: home.introDescription,
      introStatement: home.introStatement,
      introParagraph: home.introParagraph,
      introMetrics: home.introMetrics,
      approachSteps: home.approachSteps,
      techGroups: home.techGroups.map((group) => ({
        ...group,
        category: group.category as
          | "FRONTEND & RUNTIME"
          | "MOTION & CRAFT"
          | "BACKEND & DATA"
          | "INTELLIGENCE & CLOUD",
      })),
      faqItems: home.faqItems,
      ctaHeadline: home.ctaHeadline,
      ctaSubtitle: home.ctaSubtitle,
    },
  });

  const about = await getAboutPageContent("id", true);
  await payload.updateGlobal({
    slug: "page-about",
    locale: "id",
    data: {
      ...about,
      manifestoParagraphs: about.manifestoParagraphs.map((paragraph) => ({ paragraph })),
    },
  });

  const servicesPage = await getServicesPageContent("id", true);
  await payload.updateGlobal({
    slug: "page-services",
    locale: "id",
    data: {
      headline: servicesPage.headline,
      subheadline: servicesPage.subheadline,
      engagementModels: servicesPage.engagementModels.map((model) => ({
        ...model,
        features: model.features.join("\n"),
      })),
    },
  });

  await payload.updateGlobal({
    slug: "navigation",
    locale: "id",
    data: {
      items: [
        { label: "Karya", href: "/work" },
        { label: "Layanan", href: "/services" },
        { label: "Artikel", href: "/insights" },
        { label: "Tentang", href: "/about" },
        { label: "Kontak", href: "/contact" },
      ],
      primaryCtaLabel: "Mulai proyek",
    },
  });

  await payload.updateGlobal({
    slug: "footer",
    locale: "id",
    data: {
      statement: "Rekasandi adalah studio produk digital independen yang merancang dan membangun aplikasi serta sistem perangkat lunak.",
    },
  });

  await payload.updateGlobal({
    slug: "site-settings",
    locale: "id",
    data: {
      tagline: "Studio produk digital untuk strategi, desain, dan rekayasa software.",
      description: "Kami merancang dan membangun produk digital yang mendukung kebutuhan bisnis. Layanan kami mencakup strategi, desain, rekayasa software, dan integrasi AI.",
      location: "Jakarta Selatan, DKI Jakarta, Indonesia",
      availability: "Terbuka untuk proyek baru",
    },
  });

  const projects = await payload.find({ collection: "projects", locale: "en", limit: 100, overrideAccess: true });
  for (const project of projects.docs) {
    const translated = projectTranslations[project.slug];
    const sourceProject = PROJECTS.find((item) => item.slug === project.slug);
    if (!translated || !sourceProject) continue;
    const translatedBlocks = translateProjectBlocksToIndonesian(sourceProject);
    await payload.update({
      collection: "projects",
      id: project.id,
      locale: "id",
      overrideAccess: true,
      data: {
        ...translated,
        ...(translatedBlocks ? { caseStudyBlocks: translatedBlocks } : {}),
      },
    });
  }

  const services = await payload.find({ collection: "services", locale: "en", limit: 100, overrideAccess: true });
  for (const service of services.docs) {
    const translated = serviceTranslations[service.slug];
    if (!translated) continue;
    await payload.update({
      collection: "services",
      id: service.id,
      locale: "id",
      overrideAccess: true,
      data: {
        title: translated.title,
        shortDescription: translated.shortDescription,
        capabilities: translated.capabilities.map(([title, description]) => ({ title, description })),
        deliverables: translated.deliverables.map((item) => ({ item })),
      },
    });
  }

  const posts = await payload.find({ collection: "posts", locale: "en", limit: 100, overrideAccess: true });
  for (const post of posts.docs) {
    const translated = postTranslations[post.slug];
    if (!translated) continue;
    await payload.update({
      collection: "posts",
      id: post.id,
      locale: "id",
      overrideAccess: true,
      data: translated,
    });
  }

  const media = await payload.find({ collection: "media", locale: "en", limit: 200, overrideAccess: true });
  for (const item of media.docs) {
    const translated = item.filename ? mediaTranslations[item.filename] : undefined;
    if (!translated) continue;
    await payload.update({
      collection: "media",
      id: item.id,
      locale: "id",
      overrideAccess: true,
      data: translated,
    });
  }

  const testimonials = await payload.find({ collection: "testimonials", locale: "en", limit: 100, overrideAccess: true });
  for (const testimonial of TESTIMONIALS) {
    const existing = testimonials.docs.find((doc) => doc.author === testimonial.author);
    const document = existing || await payload.create({
      collection: "testimonials",
      locale: "en",
      overrideAccess: true,
      data: {
        quote: testimonial.quote,
        author: testimonial.author,
        role: testimonial.role,
        company: testimonial.company,
        project: testimonial.projectSlug || "",
      },
    });
    const translated = testimonialTranslations[testimonial.author];
    if (translated) {
      await payload.update({
        collection: "testimonials",
        id: document.id,
        locale: "id",
        overrideAccess: true,
        data: translated,
      });
    }
  }

  const team = await payload.find({ collection: "team-members", locale: "en", limit: 100, overrideAccess: true });
  for (const member of team.docs) {
    const translated = teamTranslations[member.name];
    if (!translated) continue;
    await payload.update({
      collection: "team-members",
      id: member.id,
      locale: "id",
      overrideAccess: true,
      data: translated,
    });
  }

  payload.logger.info("Indonesian Payload content seeded.");
}
