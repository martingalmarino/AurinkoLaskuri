import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getKuntaBySlug, getAllKuntaSlugs } from '@/lib/kunnatFI'
import { roiSolarCalculator } from '@/lib/roiSolarFI'
import { faqGenerator } from '@/lib/faqJsonLd'
import { SolarSystemInputs, ROICalculationResult } from '@/lib/types'
import { getMockSolarRadiation, getMockElectricityPrice } from '@/lib/mockData'
import CalculatorWrapper from '@/components/CalculatorWrapper'
import Hero from '@/components/Hero'
import FAQAccordion from '@/components/FAQAccordion'
import LocalInstallers from '@/components/LocalInstallers'
import FeatureStrip from '@/components/FeatureStrip'
import KuntaPills from '@/components/KuntaPills'
import HowItWorks from '@/components/HowItWorks'

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

  // Use mock data for now (APIs can be enabled later)
  const solarRadiationData = getMockSolarRadiation(kunta.fmiStation)
  const electricityPriceData = getMockElectricityPrice()

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
        {/* Hero Section */}
        <Hero 
          kunta={kunta}
          electricityPrice={electricityPriceData.price}
          solarRadiation={solarRadiationData.annualRADGLO}
        />

        {/* Calculator Section */}
        <section className="py-16 -mt-8 relative z-10">
          <div className="container-premium">
            <CalculatorWrapper kunta={kunta} />
          </div>
        </section>

        {/* Feature Strip */}
        <FeatureStrip />

        {/* Kunta Pills */}
        <KuntaPills currentKunta={params.kunta} />

        {/* How It Works */}
        <HowItWorks />

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
        <LocalInstallers kunta={kunta} />

        {/* Additional Local Information */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-premium">
            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                Lisätietoja aurinkopaneelien asentamisesta {kunta.name}ssa
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Paikalliset olosuhteet
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-text-muted">Vuotuinen aurinkosäteily:</span>
                      <span className="font-semibold">{solarRadiationData.annualRADGLO} kWh/m²</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-muted">Alue:</span>
                      <span className="font-semibold">{kunta.region}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-muted">Asukasluku:</span>
                      <span className="font-semibold">{kunta.population.toLocaleString('fi-FI')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-muted">FMI-asema:</span>
                      <span className="font-semibold">{kunta.fmiStation}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Saatavilla olevat tuet
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-text-muted">Valtion tuki:</span>
                      <span className="font-semibold text-primary-800">{(kunta.subsidy.national.rate * 100).toFixed(0)}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-muted">Paikallinen tuki:</span>
                      <span className="font-semibold text-success-800">{(kunta.subsidy.local.rate * 100).toFixed(0)}%</span>
                    </li>
                    <li className="flex justify-between border-t border-text-light/20 pt-3">
                      <span className="font-semibold">Yhteensä:</span>
                      <span className="font-bold text-text-primary text-lg">{((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-muted">Nykyinen sähkön hinta:</span>
                      <span className="font-semibold">{electricityPriceData.price.toFixed(3)} €/kWh</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  💡 Vinkki {kunta.name}ssa
                </h3>
                <p className="text-primary-800">
                  {kunta.name}ssa aurinkopaneelien asennus on erityisen kannattavaa {kunta.region} alueen 
                  hyvän aurinkosäteilyn ja {((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}% 
                  tukejen ansiosta. Takaisinmaksuaika on yleensä 6-12 vuotta.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
