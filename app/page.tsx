import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { FunZone } from "@/components/fun-zone"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { Particles } from "@/components/particles"

export default function Page() {
  return (
    <>
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <FunZone />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
