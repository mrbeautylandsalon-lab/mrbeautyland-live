import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Offers from "@/components/sections/Offers";
import Transformations from "@/components/sections/Transformations";
import Testimonials from "@/components/sections/Testimonials";
import GalleryPreview from "@/components/sections/GalleryPreview";
import ContactCTA from "@/components/sections/ContactCTA";
import StatsSection from "@/components/sections/StatsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <WhyChooseUs />
      <Offers />
      <Transformations />
      <Testimonials />
      <GalleryPreview />
      <ContactCTA />
    </>
  );
}
