import type { NextConfig } from "next";
import path from "path";

/** Kořen aplikace – bez toho může standalone zrcadlit cestu z disku (např. Documents/.../server.js). */
const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(process.cwd()),
  /** 301 ze starého PHP webu – Google a záložky skončí na nových cestách (bez .php). */
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/osobnosti.php", destination: "/osobnosti", permanent: true },
      { source: "/novinky.php", destination: "/novinky", permanent: true },
      { source: "/sbirka.php", destination: "/sbirka", permanent: true },
      { source: "/sponzori.php", destination: "/sponzori", permanent: true },
      { source: "/galerie.php", destination: "/galerie", permanent: true },
      { source: "/o-nas.php", destination: "/o-nas", permanent: true },
      { source: "/onas.php", destination: "/o-nas", permanent: true },
      { source: "/kontakt.php", destination: "/o-nas#kontakt", permanent: true },
      { source: "/kontakty.php", destination: "/kontakty", permanent: true },
      { source: "/pro-media.php", destination: "/pro-media", permanent: true },
      { source: "/ke-stazeni.php", destination: "/ke-stazeni", permanent: true },
      {
        source: "/clanek.php",
        has: [{ type: "query", key: "id", value: "(?<id>\\d+)" }],
        destination: "/clanek/:id",
        permanent: true,
      },
      // Typo inde.php a jakýkoli jiný neznámý *.php → úvod (až po výše uvedených přesných pravidlech)
      { source: "/(.*)\\.php", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", pathname: "/api/**" },
      { protocol: "https", hostname: "localhost", pathname: "/api/**" },
      {
        protocol: "https",
        hostname: "veterancupletohrad.cz",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "www.veterancupletohrad.cz",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
