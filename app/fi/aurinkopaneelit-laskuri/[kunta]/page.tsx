import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getKuntaBySlug, getAllKuntaSlugs } from '@/lib/kunnatFI'
import { roiSolarCalculator } from '@/lib/roiSolarFI'
import { faqGenerator } from '@/lib/faqJsonLd'
import { SolarSystemInputs, ROICalculationResult } from '@/lib/types'
import { dataService } from '@/lib/dataService'
import CalculatorWrapper from '@/components/CalculatorWrapper'
import Hero from '@/components/Hero'
import FAQAccordion from '@/components/FAQAccordion'
import LocalInstallers from '@/components/LocalInstallers'

interface PageProps {
  params: {
    kunta: string
  }
}

// Generate static params for all kunnat
export async function generateStaticParams() {
  const slugs = getAllKuntaSlugs()
  return slugs.map((slug) => ({
    kunta: slug,
  }))
}

// Generate metadata for each kunta page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const kunta = getKuntaBySlug(params.kunta)
  
  if (!kunta) {
    return {
      title: 'Kunta ei löytynyt - AurinkoLaskuri',
    }
  }

  const title = `Aurinkopaneelit Laskuri ${kunta.name} - ROI ja Säästöt | AurinkoLaskuri`
  const description = `Laske aurinkopaneelien takaisinmaksuaika ja säästöt ${kunta.name}ssa. Käytämme FMI säteilytietoja ja Nord Pool sähkön hintoja. Tuet: ${((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}%`

  return {
    title,
    description,
    keywords: [
      'aurinkopaneelit',
      'ROI',
      'takaisinmaksuaika',
      kunta.name,
      kunta.region,
      'sähkö',
      'säästöt',
      'FMI',
      'Nord Pool',
      'tuet',
      'valtion tuki',
      'paikallinen tuki'
    ],
    openGraph: {
      title,
      description,
      url: `https://aurinkolaskuri.fi/fi/aurinkopaneelit-laskuri/${kunta.slug}`,
      siteName: 'AurinkoLaskuri',
      locale: 'fi_FI',
      type: 'website',
      images: [
        {
          url: `/og-images/${kunta.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `Aurinkopaneelit laskuri ${kunta.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-images/${kunta.slug}.jpg`],
    },
    alternates: {
      canonical: `https://aurinkolaskuri.fi/fi/aurinkopaneelit-laskuri/${kunta.slug}`,
    },
  }
}

export default async function KuntaPage({ params }: PageProps) {
  const kunta = getKuntaBySlug(params.kunta)
  
  if (!kunta) {
    notFound()
  }

  // Fetch data using the data service (real APIs in production, mock in development)
  const solarRadiationData = await dataService.getSolarRadiation(kunta.fmiStation)
  const electricityPriceData = await dataService.getElectricityPrice()

  // Calculate default ROI for metadata
  const defaultInputs = {
    systemSizeKw: 5,
    installationCost: 7500,
    panelEfficiency: 0.19,
  }

  const defaultROI = roiSolarCalculator.calculateROI(
    defaultInputs,
    solarRadiationData,
    electricityPriceData,
    kunta.subsidy
  )

  // Generate FAQ data
  const faqContext = {
    kunta,
    roiResult: defaultROI,
    electricityPrice: electricityPriceData.price,
    solarRadiation: solarRadiationData.annualRADGLO,
  }

  const faqItems = faqGenerator.generateFAQItems(faqContext)
  const faqJsonLd = faqGenerator.generateFAQJsonLd(faqContext)


  return (
    <div className="min-h-screen bg-bg-primary">
      
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: faqJsonLd,
        }}
      />

      <main>
        {/* Hero Section with integrated Calculator */}
        <Hero 
          kunta={kunta}
          electricityPrice={electricityPriceData.price}
          solarRadiation={solarRadiationData.annualRADGLO}
        >
          <div className="container-premium">
            <CalculatorWrapper kunta={kunta} />
          </div>
        </Hero>


        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-bg-primary">
          <div className="container-premium">
            <div className="text-center mb-16">
              <h2 className="mb-4">
                Usein kysytyt kysymykset - {kunta.name}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Vastaukset yleisimpiin kysymyksiin aurinkopaneelien asennuksesta {kunta.name}ssa
              </p>
            </div>
            
            <FAQAccordion 
              faqs={faqItems}
              title={`Usein Kysytyt Kysymykset - Aurinkopaneelit ${kunta.name}`}
            />
          </div>
        </section>

        {/* Local Installers */}
        <LocalInstallers 
          kunta={kunta} 
          electricityPrice={electricityPriceData.price}
          solarRadiation={solarRadiationData.annualRADGLO}
        />

      </main>
    </div>
  )
}
