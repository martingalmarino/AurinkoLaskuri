import Link from 'next/link'
import { Calculator, Zap, TrendingUp, Shield, Target, Database, Mail, Phone, MapPin } from 'lucide-react'
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

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Miksi valita AurinkoLaskuri?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Suomen tarkin aurinkopaneelien ROI-laskuri, joka käyttää ajantasaisia tietoja ja huomioi kaikki tuet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-800" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Tarkka ROI</h3>
              <p className="text-sm text-gray-600">Real-time FMI & Nord Pool data</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-800" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Paikallinen tuki</h3>
              <p className="text-sm text-gray-600">Huomioi kunnalliset tukiohjelmat</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-800" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fiksu sijoitus</h3>
              <p className="text-sm text-gray-600">Näe takaisinmaksuaika & pitkän aikavälin säästöt</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-primary-800" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Läpinäkyvä</h3>
              <p className="text-sm text-gray-600">Selkeät oletukset & metodologia</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Usein kysytyt kysymykset
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vastaukset yleisimpiin kysymyksiin aurinkopaneelien asennuksesta Suomessa
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kuinka ROI lasketaan aurinkopaneeleille?
              </h3>
              <p className="text-gray-600">
                ROI lasketaan ottamalla huomioon järjestelmän hankintahinta, vuotuinen energiantuotanto, 
                sähkön hinta ja mahdolliset tuet. Käytämme ajantasaisia FMI säteilytietoja ja Nord Pool 
                sähkön hintoja tarkkojen laskelmien tekemiseen.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Onko saatavilla valtion tai paikallisia tukia?
              </h3>
              <p className="text-gray-600">
                Kyllä! Suomen valtio tarjoaa tukea aurinkopaneelien asennukseen, ja monet kunnat tarjoavat 
                lisätukea. Laskurimme huomioi automaattisesti saatavilla olevat tuet kotikuntasi mukaan.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kuinka paljon energiaa aurinkopaneelit tuottavat Suomessa?
              </h3>
              <p className="text-gray-600">
                Vuotuinen energiantuotanto riippuu sijainnista ja paneelien koosta. Etelä-Suomessa tuotanto 
                on noin 900-1000 kWh/kWp vuodessa, kun taas pohjoisessa se on hieman vähemmän. Laskurimme 
                käyttää paikallisia säteilytietoja tarkkojen arvioiden tekemiseen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ota yhteyttä
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tarvitsetko apua aurinkopaneelien laskelmien kanssa? Ota yhteyttä!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yhteystiedot</h3>
              <div className="space-y-3 text-left">
                <p className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-primary-600" />
                  info@aurinkolaskuri.fi
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-primary-600" />
                  +358 40 123 4567
                </p>
                <p className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-primary-600" />
                  Helsinki, Suomi
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Palvelut</h3>
              <div className="space-y-2 text-left text-gray-600">
                <p>• ROI-laskelmat kaikille kunnille</p>
                <p>• Ajantasaiset sähkön hinnat</p>
                <p>• Paikallisten tukien tiedot</p>
                <p>• Vertailu eri järjestelmille</p>
              </div>
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
