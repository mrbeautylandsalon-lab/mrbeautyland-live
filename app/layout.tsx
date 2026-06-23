import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import MouseGlow from "@/components/MouseGlow";
import Loader from "@/components/Loader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageTransition from "@/components/PageTransition";
import BackgroundParticles from "@/components/BackgroundParticles";

export const metadata: Metadata = {
  title: "MR Beauty Land | Luxury Salon - Hair, Skin & Bridal Services",
  description: "Experience premium hair, skin, bridal, and spa services at MR Beauty Land. Where beauty meets luxury. Book your appointment today.",
  keywords: "luxury salon, bridal makeup, hair services, skin services, spa, MR Beauty Land, Jaipur salon",
  openGraph: {
    title: "MR Beauty Land | Luxury Salon",
    description: "Where Beauty Meets Luxury — Premium Salon Services",
    type: "website",
    url: "https://www.mrbeautyland.in",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ background: "#F8F6F2", overflowX: "hidden" }}>
        <Loader />
        <BackgroundParticles />
        <LenisProvider>
          <MouseGlow />
          <Navbar />
          <PageTransition>
            <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
          </PageTransition>
          <Footer />
          <FloatingButtons />
        </LenisProvider>
      </body>
    </html>
  );
}
