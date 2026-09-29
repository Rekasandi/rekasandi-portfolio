import type { Project } from "@/data/schema";
import type { Project as PayloadProject } from "@/payload-types";

const translations = {
  "aether-ai": {
    overview: {
      challenge: "Data operasional perusahaan tersebar di 14 sistem lama. Analis harus mencari, membersihkan, dan merangkum data secara manual sehingga laporan membutuhkan beberapa hari.",
      solution: "Rekasandi merancang mesin alur kerja AI yang menyatukan pencarian data, perutean tugas, dan antarmuka streaming untuk membantu tim menjalankan tugas berbasis informasi.",
      roles: ["Arsitektur produk", "Rekayasa desain UI/UX", "Platform web full-stack", "Evaluasi dan penyetelan model"],
    },
    stats: {
      title: "Dampak dan metrik penggunaan",
      items: [
        ["Kecepatan alur kerja", "Waktu pembuatan laporan kuartalan turun dari empat hari menjadi 45 menit."],
        ["Beban kueri manual", "Perutean agen membantu mengurangi eskalasi rutin kepada analis."],
        ["Akurasi penalaran", "Diuji menggunakan 120.000 kueri kepatuhan operasional."],
        ["Latensi token streaming", "Pipeline edge mengirim respons tanpa jeda panjang."],
      ],
    },
    columns: {
      heading: "Menghubungkan data dan alur kerja",
      leftTitle: "01 / Arsitektur dan pipeline data",
      leftContent: "Kami menghubungkan pencarian semantik dan pemrosesan model melalui pipeline asinkron. Pemisahan proses membantu antarmuka menampilkan respons awal tanpa menunggu seluruh tugas selesai.",
      rightTitle: "02 / Bahasa desain editorial",
      rightContent: "Alih-alih mengandalkan kotak chat yang padat, antarmuka menyajikan konteks melalui panel samping, jejak data, dan status proses yang mudah dipahami.",
    },
    quote: "Rekasandi membantu tim global kami mengakses informasi perusahaan dengan cara yang lebih terarah. Perhatian mereka pada gerak, tipografi, dan kecepatan terlihat di seluruh produk.",
    tech: [
      ["Framework frontend", "Rendering server, respons streaming, dan caching edge."],
      ["Sistem desain", "Tema gelap berbasis token untuk antarmuka operasional."],
      ["Database dan penyimpanan vektor", "Pencarian semantik yang terhubung dengan data relasional."],
      ["Mesin animasi", "Transisi status dan interaksi komponen yang terarah."],
    ],
    media: "Canvas penalaran multi-agen dan graf eksekusi real-time Aether AI",
    gallery: {
      title: "Artefak arsitektur dan sistem antarmuka",
      description: "Tampilan telemetri, panel perutean tugas, dan komponen desain untuk membantu operator memahami proses AI.",
      images: [
        ["Canvas penalaran multi-agen dan graf eksekusi real-time", "Canvas penalaran Aether AI"],
        ["Visualisasi topologi vektor dan pemantauan aliran data", "Topologi vektor Aether AI"],
        ["Widget telemetri ringkas untuk meninjau metrik operasional", "Telemetri ringkas Aether AI"],
      ],
    },
  },
  "kroma-design-system": {
    overview: {
      challenge: "Kroma mengelola 18 portal web yang dibangun oleh lima tim selama enam tahun. Perbedaan antarmuka, masalah aksesibilitas, dan pengulangan komponen memperlambat pengembangan.",
      solution: "Rekasandi membangun sistem token yang menghubungkan variabel Figma dengan repositori kode, beserta komponen React yang dapat diakses dan siap digunakan.",
      roles: ["Arsitektur sistem desain", "Audit aksesibilitas", "Rekayasa komponen", "Portal dokumentasi developer"],
    },
    stats: {
      title: "Cakupan sistem desain",
      items: [
        ["Komponen produksi", "Komponen dirancang dengan dukungan keyboard dan pola aksesibilitas."],
        ["Waktu pengerjaan sprint", "Primitif siap pakai membantu tim menyusun antarmuka fitur."],
        ["Kepatuhan WCAG AAA", "Palet kontras dan status fokus diterapkan pada portal."],
        ["Aplikasi terhubung", "Satu paket berversi digunakan oleh seluruh rangkaian produk."],
      ],
    },
    columns: {
      heading: "Token sebagai sumber kebenaran",
      leftTitle: "01 / Pipeline token dan otomatisasi CI",
      leftContent: "Perubahan warna, radius, dan jarak dari Figma diproses menjadi token kode. Pemeriksaan kontras dijalankan sebelum paket versi baru diterbitkan.",
      rightTitle: "02 / Hierarki visual yang terarah",
      rightContent: "Komponen menggunakan batas, tipografi, dan interaksi seperlunya. Setiap brand dapat mempertahankan identitas visual tanpa mengubah perilaku dasar komponen.",
    },
    quote: "Sistem desain Rekasandi memberi tim kami dasar bersama untuk membangun antarmuka. Komponen dan pola visual kini lebih konsisten di berbagai produk.",
    tech: [
      ["Primitif inti", "Props yang fleksibel, penerusan ref, dan kontrak aksesibilitas."],
      ["Fondasi aksesibilitas", "Menu, dialog, dan tab yang mendukung navigasi keyboard."],
      ["Mesin token gaya", "Variabel CSS yang terhubung dengan token desain semantik."],
    ],
    media: "Graf token dan struktur komponen Kroma Multi-Brand Design Engine",
    gallery: {
      title: "Token desain dan komponen produksi",
      description: "Pipeline token desain dan antarmuka komponen yang diuji dengan standar aksesibilitas WCAG.",
      images: [
        ["Hierarki komponen dan skala tipografi", "Hierarki komponen Kroma"],
        ["Arsitektur token dan matriks variabel CSS mode gelap", "Pohon token Kroma"],
        ["Badge interaktif dan status mikro-interaksi", "Interaksi mikro Kroma"],
      ],
    },
  },
  "volta-fleet-os": {
    overview: {
      challenge: "Volta mengelola armada angkutan lintas negara. Data kendaraan tersebar di pelacak satelit, perangkat OBD, dan portal bahan bakar sehingga operator kesulitan melihat kondisi armada secara menyeluruh.",
      solution: "Rekasandi membangun platform Mission Control yang menyatukan peta armada, pembaruan GPS, informasi energi, dan notifikasi untuk dispatcher.",
      roles: ["Rekayasa sistem", "Arsitektur dashboard operasional", "Visualisasi geospasial WebGL", "Lapisan WebSocket yang tangguh"],
    },
    stats: {
      title: "Telemetri dan operasi armada",
      items: [
        ["Kendaraan terhubung", "Telemetri GPS diterima secara berkala dari armada."],
        ["Ketersediaan sistem", "Cluster multiwilayah mendukung pemulihan otomatis."],
        ["Waktu kendaraan menganggur", "Perutean dinamis membantu menghindari titik padat."],
        ["Penghematan energi tahunan", "Perkiraan dihitung dari operasi armada listrik dan hibrida."],
      ],
    },
    columns: {
      heading: "Mengelola telemetri armada",
      leftTitle: "01 / Mesin geospasial WebGL",
      leftContent: "Peta berbasis DOM dapat melambat saat menampilkan banyak kendaraan. Lapisan WebGL membantu merender posisi armada dan mendukung interaksi peta yang lancar.",
      rightTitle: "02 / Informasi untuk dispatcher",
      rightContent: "Antarmuka memprioritaskan status penting, meredam detail peta yang tidak mendesak, dan menggunakan tipografi telemetri yang mudah dipindai selama giliran kerja.",
    },
    quote: "Volta OS menjadi pusat informasi operasi kami. Platform ini membantu operator memahami status armada dan menjalankan proses onboarding dengan lebih terarah.",
    tech: [
      ["Framework aplikasi", "Perutean modular dan pengambilan data untuk dashboard operasional."],
      ["Mesin geospasial", "Visualisasi armada dan heatmap dengan akselerasi perangkat keras."],
      ["Streaming data", "Penyimpanan telemetri deret waktu dan perantara pesan."],
    ],
    media: "Telemetri real-time dan perutean armada Volta Fleet OS",
    gallery: {
      title: "Telemetri armada dan antarmuka Mission Control",
      description: "Peta perutean, informasi penggunaan energi, dan dashboard pemeliharaan armada.",
      images: [
        ["Peta lintasan armada dan telemetri baterai", "Peta armada Volta"],
        ["Arsitektur pipeline streaming telemetri", "Pipeline telemetri Volta"],
        ["Panduan pengemudi dan notifikasi rute", "Panduan pengemudi Volta"],
      ],
    },
  },
  "nexa-pay": {
    overview: {
      challenge: "Transfer internasional dapat memerlukan beberapa hari, biaya tukar tersembunyi, dan verifikasi identitas berbasis dokumen. Proses ini menyulitkan pengguna menyelesaikan transaksi.",
      solution: "Rekasandi merancang produk multi-platform untuk konversi mata uang, verifikasi identitas digital, dan pengelolaan kartu dalam satu antarmuka.",
      roles: ["Arsitektur UX/UI fintech", "Rekayasa mobile dan web", "Sistem desain", "Standar keamanan dan kepatuhan"],
    },
    stats: {
      title: "Metrik transaksi",
      items: [
        ["Volume transaksi", "Volume transaksi lintas koridor mata uang."],
        ["Peringkat aplikasi", "Penilaian pengguna di App Store."],
        ["Kecepatan penyelesaian", "Transaksi dompet lintas negara diproses secara langsung."],
        ["Akurasi transaksi", "Pemeriksaan dilakukan pada catatan ledger."],
      ],
    },
    columns: {
      heading: "Detail interaksi untuk layanan finansial",
      leftTitle: "01 / Interaksi mikro dan konfirmasi",
      leftContent: "Alur pembayaran memberi umpan balik saat pengguna memilih mata uang, mengatur jumlah, dan mengonfirmasi transaksi.",
      rightTitle: "02 / Keamanan transaksi",
      rightContent: "Enkripsi, autentikasi biometrik, dan pemeriksaan transaksi membantu melindungi akun tanpa menambah langkah yang tidak perlu.",
    },
    quote: "Rekasandi membantu kami merancang pengalaman finansial yang lebih mudah dipahami di web dan mobile. Alur transaksi kini terasa lebih jelas bagi pengguna.",
    tech: [
      ["Produk multi-platform", "Logika bersama dan sistem desain untuk web dan mobile."],
      ["Keamanan tipe", "Perhitungan finansial dan kontrak API yang tervalidasi."],
      ["Interaksi mikro", "Transisi kartu, konversi mata uang, dan status transaksi."],
    ],
    media: "Arsitektur penyelesaian pembayaran lintas negara Nexa Pay",
    gallery: {
      title: "Analitik treasury dan alur kerja ledger",
      description: "Proses kliring multi-mata uang dan dashboard pelaporan transaksi.",
      images: [
        ["Graf penyelesaian ledger dan matriks verifikasi transaksi", "Graf ledger Nexa Pay"],
        ["Pipeline perutean likuiditas FX dan jejak audit", "Perutean likuiditas FX Nexa Pay"],
        ["Status persetujuan biometrik dan pemantauan kepatuhan", "Persetujuan biometrik Nexa Pay"],
      ],
    },
  },
} as const;

export function translateProjectBlocksToIndonesian(
  project: Project,
): PayloadProject["caseStudyBlocks"] | undefined {
  const copy = translations[project.slug as keyof typeof translations];
  if (!copy) return undefined;

  return project.caseStudyBlocks.map((block) => {
    if (block.type === "overview") {
      return {
        blockType: "overview" as const,
        challenge: copy.overview.challenge,
        solution: copy.overview.solution,
        role: copy.overview.roles.map((item) => ({ item })),
      };
    }
    if (block.type === "stats") {
      return {
        blockType: "stats" as const,
        title: copy.stats.title,
        items: block.items.map((item, itemIndex) => ({
          value: item.value,
          label: copy.stats.items[itemIndex][0],
          description: copy.stats.items[itemIndex][1],
        })),
      };
    }
    if (block.type === "twoColumn") {
      return {
        blockType: "twoColumn" as const,
        heading: copy.columns.heading,
        leftTitle: copy.columns.leftTitle,
        leftContent: copy.columns.leftContent,
        rightTitle: copy.columns.rightTitle,
        rightContent: copy.columns.rightContent,
      };
    }
    if (block.type === "quote") {
      return {
        blockType: "quote" as const,
        quote: copy.quote,
        author: block.author,
        role: block.role,
        company: block.company,
      };
    }
    if (block.type === "techStack") {
      const technologies = block.technologies.map((technology, itemIndex) => ({
        name: technology.name,
        category: technology.category,
        description: copy.tech[itemIndex]?.[1] || technology.description,
      }));
      return { blockType: "techStack" as const, technologies };
    }
    if (block.type === "fullWidthMedia") {
      return {
        blockType: "fullWidthMedia" as const,
        mediaUrl: block.mediaUrl,
        caption: copy.media,
        credit: "Rekasandi",
        aspectRatio: block.aspectRatio,
      };
    }
    if (block.type === "gallery") {
      return {
        blockType: "gallery" as const,
        title: copy.gallery.title,
        description: copy.gallery.description,
        images: block.images.map((image, imageIndex) => ({
          url: image.url,
          caption: copy.gallery.images[imageIndex]?.[0] || image.caption || "",
          alt: copy.gallery.images[imageIndex]?.[1] || image.alt || "",
          aspectRatio: image.aspectRatio || "16/9",
        })),
      };
    }
    return {
      blockType: "fullWidthMedia" as const,
      mediaUrl: block.mediaUrl,
      caption: block.caption || "",
      credit: "Rekasandi",
      aspectRatio: block.aspectRatio || "21/9",
    };
  }) as PayloadProject["caseStudyBlocks"];
}
