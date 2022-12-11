export type Empresa = {
  value: string
  label: string
  dir: string
}

const empresas: Empresa[] = []

process.env.NEXT_PUBLIC_EMPRESAS?.split(';').forEach(empresa => {
  const [value, label, dir] = empresa.split(',')
  empresas.push({ value, label, dir })
})

export default empresas
