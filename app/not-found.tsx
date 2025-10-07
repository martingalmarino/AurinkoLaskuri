import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sivu ei löytynyt
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Hakemaasi sivua ei löytynyt. Se on ehkä siirretty tai poistettu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary inline-flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Takaisin kotiin
            </Link>
            <Link href="/fi/aurinkopaneelit-laskuri/helsinki" className="btn-secondary inline-flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Aurinkopaneelit laskuri
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
