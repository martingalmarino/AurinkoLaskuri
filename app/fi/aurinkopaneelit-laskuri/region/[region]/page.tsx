import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, TrendingUp, Zap } from 'lucide-react'
import { kunnatFI } from '@/lib/kunnatFI'

interface PageProps {
  params: {
    region: string
  }
}

// Generate static params for all regions
export async function generateStaticParams() {
  const regions = [...new Set(kunnatFI.map(kunta => kunta.region.toLowerCase()))]
  return regions.map((region) => ({
    region: region,
  }))
}

// Generate metadata for each region page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const regionName = params.region.charAt(0).toUpperCase() + params.region.slice(1)
  const municipalitiesInRegion = kunnatFI.filter(k => k.region.toLowerCase() === params.region.toLowerCase())
  
  if (municipalitiesInRegion.length === 0) {
    return {
      title: 'Alue ei löytynyt - AurinkoLaskuri',
    }
  }

  const title = `Aurinkopaneelit ${regionName} - ROI Laskuri kaikille kunnille | AurinkoLaskuri`
  const description = `Laske aurinkopaneelien takaisinmaksuaika ja säästöt ${regionName} alueen kunnissa. ${municipalitiesInRegion.length} kuntaa saatavilla: ${municipalitiesInRegion.slice(0, 5).map(k => k.name).join(', ')} ja muut.`

  return {
    title,
    description,
    keywords: [
      'aurinkopaneelit',
      'ROI',
      'takaisinmaksuaika',
      regionName,
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
      url: `https://www.aurinkocalc.com/fi/aurinkopaneelit-laskuri/region/${params.region}`,
      siteName: 'AurinkoCalc',
      locale: 'fi_FI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.aurinkocalc.com/fi/aurinkopaneelit-laskuri/region/${params.region}`,
    },
  }
}

export default function RegionPage({ params }: PageProps) {
  const regionName = params.region.charAt(0).toUpperCase() + params.region.slice(1)
  const municipalitiesInRegion = kunnatFI.filter(k => k.region.toLowerCase() === params.region.toLowerCase())
  
  if (municipalitiesInRegion.length === 0) {
    notFound()
  }

  // Calculate region statistics
  const totalPopulation = municipalitiesInRegion.reduce((sum, k) => sum + k.population, 0)
  const avgSubsidy = municipalitiesInRegion.reduce((sum, k) => 
    sum + (k.subsidy.national.rate + k.subsidy.local.rate), 0) / municipalitiesInRegion.length

  return (
    <div className="min-h-screen bg-bg-primary">
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container-hero px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <div className="flex items-center justify-center">
                <ol className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm text-sm">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-primary-700 transition-colors font-medium">
                      Koti
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/#kunnat" className="text-gray-600 hover:text-primary-700 transition-colors font-medium">
                      Aurinkopaneelit
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 font-semibold">{regionName}</span>
                  </li>
                </ol>
              </div>
            </nav>

            {/* Main Content */}
            <div className="text-center mb-12">
              <h1 className="mb-6 animate-fade-in text-3xl sm:text-4xl lg:text-5xl">
                Aurinkopaneelit {regionName}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
                Laske aurinkopaneelien takaisinmaksuaika ja säästöt {regionName} alueen kunnissa. 
                {municipalitiesInRegion.length} kuntaa saatavilla ajantasaisilla tiedoilla.
              </p>

              {/* Region Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-sm font-medium text-gray-700">
                    {municipalitiesInRegion.length} kuntaa
                  </span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-sm font-medium text-gray-700">
                    {totalPopulation.toLocaleString('fi-FI')} asukasta
                  </span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-sm font-medium text-gray-700">
                    {(avgSubsidy * 100).toFixed(0)}% keskimääräinen tuki
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Municipalities Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Valitse kunta
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Löydä aurinkopaneelien laskuri kotikuntasi sivulta
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {municipalitiesInRegion.map((kunta) => (
                <Link
                  key={kunta.slug}
                  href={`/fi/aurinkopaneelit-laskuri/${kunta.slug}`}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-1">
                        {kunta.name}
                      </h3>
                      <p className="text-sm text-gray-600">{kunta.population.toLocaleString('fi-FI')} asukasta</p>
                    </div>
                    <div className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valtion tuki:</span>
                      <span className="font-semibold text-blue-600">
                        {(kunta.subsidy.national.rate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paikallinen tuki:</span>
                      <span className="font-semibold text-green-600">
                        {(kunta.subsidy.local.rate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">FMI-asema:</span>
                      <span className="font-semibold text-purple-600">
                        {kunta.fmiStation}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                      <Zap className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Laske ROI</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back to All Municipalities */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/#kunnat"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Selaa kaikkia kuntia
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
