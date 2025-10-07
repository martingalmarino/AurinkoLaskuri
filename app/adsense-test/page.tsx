export default function AdSenseTest() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AdSense Test Page
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">AdSense Verification Test</h2>
            <p className="text-gray-600 mb-4">
              Esta página está diseñada para ayudar a Google AdSense a verificar el sitio.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Información del sitio:</h3>
              <ul className="text-blue-800 space-y-1">
                <li><strong>Dominio:</strong> www.aurinkocalc.com</li>
                <li><strong>Publisher ID:</strong> ca-pub-6771833588582297</li>
                <li><strong>Contenido:</strong> Calculadora de ROI solar para Finlandia</li>
                <li><strong>Idioma:</strong> Finés (fi)</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contenido de ejemplo</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                AurinkoCalc es una calculadora de ROI para paneles solares en Finlandia. 
                Nuestro sitio utiliza datos reales de FMI (Instituto Meteorológico Finlandés) 
                y Nord Pool para proporcionar cálculos precisos de retorno de inversión.
              </p>
              
              <p className="mb-4">
                Los usuarios pueden calcular el tiempo de amortización de sus paneles solares 
                basándose en datos de radiación solar específicos de su municipio y precios 
                actuales de electricidad del mercado nórdico.
              </p>
              
              <p className="mb-4">
                El sitio cubre más de 20 municipios finlandeses y proporciona información 
                detallada sobre subsidios locales, instaladores y datos técnicos relevantes 
                para la instalación de paneles solares.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Enlaces de navegación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="/" 
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold">Página Principal</h3>
                <p className="text-sm text-gray-600">Calculadora principal de ROI solar</p>
              </a>
              
              <a 
                href="/fi/aurinkopaneelit-laskuri/helsinki" 
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold">Helsinki</h3>
                <p className="text-sm text-gray-600">Cálculos específicos para Helsinki</p>
              </a>
              
              <a 
                href="/fi/aurinkopaneelit-laskuri/tampere" 
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold">Tampere</h3>
                <p className="text-sm text-gray-600">Cálculos específicos para Tampere</p>
              </a>
              
              <a 
                href="/fi/aurinkopaneelit-laskuri/espoo" 
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold">Espoo</h3>
                <p className="text-sm text-gray-600">Cálculos específicos para Espoo</p>
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Esta página es temporal y se puede eliminar después de la verificación de AdSense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
