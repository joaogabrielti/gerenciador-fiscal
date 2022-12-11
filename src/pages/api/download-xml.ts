import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs'
import stream from 'stream'
import { promisify } from 'util'

import empresas from '@/utils/empresas'

const pipeline = promisify(stream.pipeline)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { empresa, id } = req.query
  const empresaSelecionada = empresas.find(e => e.value === empresa)!
  const xml = fs.readFileSync(`${empresaSelecionada.dir}/${id}`, 'utf-8')

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Disposition', `attachment; filename=${id}`)

  await pipeline(xml, res)
  res.end()
}
