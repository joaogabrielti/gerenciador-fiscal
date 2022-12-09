import App from './App'
import SearchForm from './SearchForm'

import empresas from '@/utils/empresas'

export default function Page() {
  return (
    <App>
      <SearchForm empresas={empresas} />
    </App>
  )
}
