import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, copyFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const source = path.join(appRoot, "public/pwa/logo.svg");
const pwaAssets = JSON.parse(readFileSync(path.join(appRoot, "config/pwa-assets.json"), "utf8"));
const tempRoot = path.join(tmpdir(), "onestack-pwa-assets");
const iconTemp = path.join(tempRoot, "icons");
const maskableTemp = path.join(tempRoot, "maskable");
const splashDir = path.join(appRoot, "public/splash");

const background = "#102d24";
const padding = "28%";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) >= 26) {
  console.warn("pwa-asset-generator is currently unreliable on Node 26. Use Node 24 or 22 for this script.");
}

rmSync(tempRoot, { recursive: true, force: true });
mkdirSync(iconTemp, { recursive: true });
mkdirSync(maskableTemp, { recursive: true });
mkdirSync(splashDir, { recursive: true });

function runGenerator(outputDir, extraArgs) {
  const args = [
    "exec",
    "--yes",
    "--package",
    "pwa-asset-generator",
    "--",
    "pwa-asset-generator",
    source,
    outputDir,
    "--background",
    background,
    "--padding",
    padding,
    "--type",
    "png",
    "--opaque",
    "true",
    "--log",
    "false",
    ...extraArgs
  ];

  const env = {
    ...process.env,
    PATH: `${path.dirname(process.execPath)}:${process.env.PATH ?? ""}`
  };

  if (existsSync(chromePath)) {
    env.CHROME_PATH = chromePath;
  }

  const result = spawnSync("npm", args, {
    cwd: appRoot,
    env,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function copyAsset(from, to) {
  mkdirSync(path.dirname(to), { recursive: true });
  copyFileSync(from, to);
}

runGenerator(iconTemp, ["--icon-only", "--favicon", "--maskable", "false"]);
runGenerator(maskableTemp, ["--icon-only"]);

copyAsset(path.join(iconTemp, "manifest-icon-192.png"), path.join(appRoot, "public/icons/icon-192.png"));
copyAsset(path.join(iconTemp, "manifest-icon-512.png"), path.join(appRoot, "public/icons/icon-512.png"));
copyAsset(path.join(iconTemp, "apple-icon-180.png"), path.join(appRoot, "public/icons/apple-touch-icon.png"));
copyAsset(
  path.join(maskableTemp, "manifest-icon-512.maskable.png"),
  path.join(appRoot, "public/icons/maskable-512.png")
);

const faviconLogo = await sharp(source).resize({ width: 22 }).png().toBuffer();
const faviconLogoMetadata = await sharp(faviconLogo).metadata();
const favicon = await sharp({
  create: {
    width: 32,
    height: 32,
    channels: 3,
    background
  }
})
  .composite([
    {
      input: faviconLogo,
      left: Math.round((32 - (faviconLogoMetadata.width ?? 0)) / 2),
      top: Math.round((32 - (faviconLogoMetadata.height ?? 0)) / 2)
    }
  ])
  .png()
  .toBuffer();

await sharp(favicon).toFile(path.join(appRoot, "public/icons/favicon-32.png"));
await sharp(favicon).toFile(path.join(appRoot, "app/favicon.ico"));

for (const image of pwaAssets.appleStartupImages) {
  const fileName = path.basename(image.src);
  const [, width, height] = fileName.match(/^apple-splash-(\d+)-(\d+)\.png$/) ?? [];
  if (!width || !height) {
    throw new Error(`Invalid Apple startup image filename: ${image.src}`);
  }

  const numericWidth = Number.parseInt(width, 10);
  const numericHeight = Number.parseInt(height, 10);
  const logo = await sharp(source)
    .resize({ width: Math.round(numericWidth * 0.22) })
    .png()
    .toBuffer();
  const logoMetadata = await sharp(logo).metadata();

  await sharp({
    create: {
      width: numericWidth,
      height: numericHeight,
      channels: 3,
      background
    }
  })
    .composite([
      {
        input: logo,
        left: Math.round((numericWidth - (logoMetadata.width ?? 0)) / 2),
        top: Math.round((numericHeight - (logoMetadata.height ?? 0)) / 2)
      }
    ])
    .png()
    .toFile(path.join(splashDir, fileName));
}

rmSync(tempRoot, { recursive: true, force: true });
