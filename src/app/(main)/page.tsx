import ContactSection from "@/_components/sections/ContactSection";
import Spacer from "@/_components/spacers/Spacer";
import type { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppinfoData";
import SectionPrimaryDark from "@/_components/sections/SectionPrimaryDark";
import SectionPrimary from "@/_components/sections/SectionPrimary";
import BannerMain from "@/_components/banners/BannerMain";
import ExperienceSection from "@/_components/sections/ExperienceSection";
import ServiceSection from "@/_components/sections/ServiceSection";
import { ServiceData } from "@/_data/sample/ServiceData";
import ClientSection from "@/_components/sections/ClientSection";



const title = 'Home';

export const metadata: Metadata = {
  title: title + ' | ' + AppInfoData.name,
  description: title + ' | ' + AppInfoData.name,
  keywords: [],
  openGraph: {
    images: ['/assets/images/logos/logo.png'],
    title: title + ' | ' + AppInfoData.name,
    description: title + ' | ' + AppInfoData.name,
  },
};


export default async function Page() {


  return (
    <>
      <BannerMain image={AppInfoData.headers[0]} />

      <SectionPrimary
        dir='left'
        image="/assets/images/gallery/01.jpg"
        title={AppInfoData.about.name}
        subtitle="About Us"
        details={AppInfoData.about.intro}
        href="/about"
        withContact={true}
        btnName="About Us"
      />

      <ExperienceSection />


      <SectionPrimaryDark
        dir='right'
        image="/assets/images/gallery/07.jpg"
        title={AppInfoData.whyUs.title}
        subtitle="About Us"
        btnName="Why Us?"
        href="/about#whyUs"
        withContact={false}
        details={AppInfoData.whyUs.intro}
      />

      <ServiceSection
        list={ServiceData}
        title="What we do?"
        subtitle='Our Services' />

      <div className="bg-gray-50">
        <ClientSection
          title="Who we serve"
          subtitle="Our Clients"
        />
      </div>


      <section className="bg-gray-100">
        <Spacer />
        <ContactSection dbData={AppInfoData} />
        <Spacer />
      </section>



    </>
  );
}
