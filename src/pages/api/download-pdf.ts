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

  const formData = new FormData()
  formData.append('arquivoXml', xml)

  const response = await fetch('https://www.webdanfe.com.br/danfe/GeraDanfe.php', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept-Encoding': 'gzip, deflate',
      'Cache-Control': 'no-cache',
      'Referer': 'http://webdanfe.com.br/danfe/index.html',
    },
  })

  if (!response.ok) {
    res.status(500).json({ error: 'Erro ao gerar PDF' })
    return
  }

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${(id as string).split('.')[0]}.pdf`)

  //@ts-ignore
  await pipeline(response.body, res)

  res.end()
}
