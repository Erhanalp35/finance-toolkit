import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return { metadataBase: base, title: { default: "Finora", template: "%s · Finora" }, description: "A private, multilingual financial command center.", manifest: "/manifest.webmanifest", icons: { icon: "/favicon.svg" }, openGraph: { title: "Finora — Your money, finally clear.", description: "Budget, plan, calculate and grow across currencies and borders.", images: [{ url: "/og.png", width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title: "Finora — Your money, finally clear.", description: "A calm financial command center.", images: ["/og.png"] } };
}
export const viewport: Viewport = { themeColor: "#10231e", colorScheme: "light" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={manrope.variable}>{children}</body></html>;
}
