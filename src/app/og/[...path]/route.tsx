/**
 * The picture a chat app shows beside a shared Skif link (1200×630, the size
 * Messenger, WhatsApp, Signal, Slack and X all crop well). Drawn once at build
 * for every page in SHARE_CARDS: the page's photograph under a dark wash, the
 * stag, an eyebrow and the page's headline. Unknown paths are 404s, so the
 * route cannot be used to put arbitrary words on Skif's domain.
 *
 * Fonts: Inter, the fleet's sans, as static TTF instances (the image renderer
 * reads neither woff2 nor variable fonts). Generated from
 * @bitbaum/design-tokens' Inter with fontTools; SIL Open Font License.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { PHOTOS, type Photo } from "@/config/photos";
import { SHARE_CARDS, shareCard } from "@/site/share";

export const dynamic = "force-static";
export const dynamicParams = false;

/** Read at build only (the route is static), so the reads are not traced into the server bundle. */
const ROOT = /* turbopackIgnore: true */ process.cwd();
const GOLD = "#d2ad6b";

export function generateStaticParams() {
  return SHARE_CARDS.map((c) => ({ path: c.path === "/" ? ["home"] : c.path.slice(1).split("/") }));
}

async function dataUri(file: string, type: string): Promise<string> {
  return `data:${type};base64,${(await readFile(join(/* turbopackIgnore: true */ ROOT, file))).toString("base64")}`;
}

/** The favicon's stag, recoloured gold on a transparent ground. */
async function stag(): Promise<string> {
  const svg = (await readFile(join(/* turbopackIgnore: true */ ROOT, "src/app/icon.svg"), "utf8"))
    .replace(/<rect[^>]*\/>/, "")
    .replaceAll("#f2f2f2", GOLD);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path;
  const path = segments.join("/") === "home" ? "/" : `/${segments.join("/")}`;
  const card = shareCard(path);
  if (!card) return new Response("Not found", { status: 404 });

  const photo: Photo | undefined = card.photo ? PHOTOS[card.photo] : undefined;
  const [semibold, regular, mark, background] = await Promise.all([
    readFile(join(/* turbopackIgnore: true */ ROOT, "src/site/og-fonts/inter-600.ttf")),
    readFile(join(/* turbopackIgnore: true */ ROOT, "src/site/og-fonts/inter-400.ttf")),
    stag(),
    photo ? dataUri(join("public", photo.src), "image/jpeg") : Promise.resolve(undefined),
  ]);
  const long = card.headline.length > 48;

  const png = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: "#111111", fontFamily: "Inter" }}>
        {background ? (
          // eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page
          <img
            src={background}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover", objectPosition: photo?.focus ?? "50% 50%" }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: background
              ? "linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.72) 48%, rgba(10,10,10,0.25) 100%)"
              : "linear-gradient(135deg, #161616 0%, #0c0c0c 100%)",
          }}
        />
        {background ? null : (
          // eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page
          <img src={mark} alt="" width={520} height={520} style={{ position: "absolute", right: -40, bottom: -60, opacity: 0.12 }} />
        )}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page */}
            <img src={mark} alt="" width={64} height={64} />
            <span style={{ color: "#f2f2f2", fontSize: 36, fontWeight: 600, letterSpacing: -0.5 }}>Skif</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <span style={{ color: GOLD, fontSize: 24, fontWeight: 400, letterSpacing: 4, textTransform: "uppercase" }}>{card.eyebrow}</span>
            <span style={{ color: "#ffffff", fontSize: long ? 58 : 72, fontWeight: 600, lineHeight: 1.08, letterSpacing: -1.5, marginTop: 18 }}>
              {card.headline}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.7)", fontSize: 24 }}>
            <span>Safety and freedom, from every side.</span>
            <span>skif.orangecat.ch</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
        { name: "Inter", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
  // JPEG, not the renderer's PNG: a photograph as PNG is 1–2 MB, and WhatsApp
  // drops previews much over 300 KB.
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400" } });
}
