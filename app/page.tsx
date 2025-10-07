import Link from 'next/link'
import { Calculator, Zap, TrendingUp, Shield } from 'lucide-react'
import { getAllKuntaSlugs } from '@/lib/kunnatFI'

export default function HomePage() {
  const kunnatSlugs = getAllKuntaSlugs().slice(0, 12); // Show first 12 for homepage

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-solar-50 via-primary-50 to-success-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Aurinkopaneelien ROI Laskuri
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa. 
            Käytämme FMI säteilytietoja ja Nord Pool sähkön hintoja tarkkojen laskelmien tekemiseen.
          </p>
          
          {/* Improved CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-md mx-auto">
            <Link 
              href="/fi/aurinkopaneelit-laskuri/helsinki" 
              className="group bg-primary-800 hover:bg-primary-900 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Calculator className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Aloita laskenta
            </Link>
            <Link 
              href="#kunnat" 
              className="group bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm hover:shadow-md transform hover:-translate-y-1 flex items-center justify-center"
            >
              Selaa kuntia
            </Link>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Data</h3>
              <p className="text-gray-600">
                FMI säteilytiedot ja Nord Pool sähkön hinnat
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <TrendingUp className="w-12 h-12 text-success-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tarkka ROI</h3>
              <p className="text-gray-600">
                Huomioi valtion ja paikalliset tuet
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Luotettava</h3>
              <p className="text-gray-600">
                Suomen tarkin aurinkopaneelien laskuri
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kunnat Grid */}
      <section id="kunnat" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Valitse kunta
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Löydä aurinkopaneelien laskuri kotikuntasi tai lähikuntasi sivulta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {kunnatSlugs.map((slug) => {
              const kuntaName = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
              return (
                <Link
                  key={slug}
                  href={`/fi/aurinkopaneelit-laskuri/${slug}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-colors group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                    {kuntaName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Aurinkopaneelit laskuri
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/fi/aurinkopaneelit-laskuri/helsinki"
              className="btn-primary"
            >
              Aloita laskenta Helsingissä
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Miten laskuri toimii?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kolme yksinkertaista vaihetta tarkkojen laskelmien tekemiseen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Valitse kunta
              </h3>
              <p className="text-gray-600">
                Valitse kotikuntasi tai lähikuntasi saadaksesi paikalliset säteilytiedot ja tuet
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Syötä tiedot
              </h3>
              <p className="text-gray-600">
                Anna järjestelmän koko, asennuskustannukset ja paneelien hyötysuhde
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Saat tulokset
              </h3>
              <p className="text-gray-600">
                Näe takaisinmaksuaika, vuosittaiset säästöt ja 20 vuoden säästöt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Aloita aurinkopaneelien laskenta tänään
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Laske takaisinmaksuaika ja säästöt kotikuntasi tiedoilla
          </p>
          <Link 
            href="/fi/aurinkopaneelit-laskuri/helsinki" 
            className="group bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
          >
            <Calculator className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Aloita laskenta
          </Link>
        </div>
      </section>
    </div>
  )
}
