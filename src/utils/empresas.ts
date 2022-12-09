export type Empresa = {
  value: string
  label: string
  dir: string
}

const empresas: Empresa[] = []

process.env.VITE_EMPRESAS?.split(';').forEach(empresa => {
  const [value, label, dir] = empresa.split(',')
  empresas.push({ value, label, dir })
})

console.log(empresas)

export default empresas
