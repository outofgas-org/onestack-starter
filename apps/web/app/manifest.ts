import type { MetadataRoute } from "next";
import pwaAssets from "@/config/pwa-assets.json";

const pwaAssetVersion = pwaAssets.version;
const pwaAsset = (path: string) => `${path}?v=${pwaAssetVersion}`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Onestack",
    short_name: "Onestack",
    id: "/",
    description: "A mobile-ready workspace for monitoring Polymarket positions.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#102d24",
    theme_color: "#0f3b2e",
    orientation: "portrait",
    categories: ["finance", "productivity"],
    icons: [
      {
        src: pwaAsset("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: pwaAsset("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: pwaAsset("/icons/maskable-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
