import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs'
import dayjs from 'dayjs'
import empresas from '@/utils/empresas'

import { XMLParser } from 'fast-xml-parser'

type ResponseData = {
  id: string
  empresa: string
  emitente: string
  cnpjEmitente: string
  nfSerie: string
  dataHoraEmissao: string
  valor: string
}

const str_normalize = (v: any) => v.replace(/[^\w\s]/gi, '').replace(' ', '').toUpperCase()

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData[]>) {
  const { empresa, emitente, cnpjEmitente, dataInicial, dataFinal } = req.body
  const empresaSelecionada = empresas.find(e => e.value === empresa)!

  const files = fs.readdirSync(empresaSelecionada.dir)
  const xmlParser = new XMLParser()

  const arr: ResponseData[] = []

  for (const file of files) {
    const xml = fs.readFileSync(`${empresaSelecionada.dir}/${file}`, 'utf8')
    const obj = xmlParser.parse(xml)

    const dhEmi = obj.nfeProc.NFe.infNFe.ide.dhEmi

    if (dayjs(dhEmi).isBefore(dayjs(dataInicial).startOf('day')) || dayjs(dhEmi).isAfter(dayjs(dataFinal).endOf('day'))) continue
    if (emitente && str_normalize(obj.nfeProc.NFe.infNFe.emit.xNome as string).indexOf(str_normalize(emitente))) continue
    if (cnpjEmitente && str_normalize(obj.nfeProc.NFe.infNFe.emit.CNPJ as string).indexOf(str_normalize(cnpjEmitente))) continue

    arr.push({
      id: file,
      empresa: empresaSelecionada.label,
      emitente: (obj.nfeProc.NFe.infNFe.emit.xNome as string).toUpperCase(),
      cnpjEmitente: obj.nfeProc.NFe.infNFe.emit.CNPJ,
      nfSerie: obj.nfeProc.NFe.infNFe.ide.nNF + ' - ' + obj.nfeProc.NFe.infNFe.ide.serie,
      dataHoraEmissao: obj.nfeProc.NFe.infNFe.ide.dhEmi,
      valor: obj.nfeProc.NFe.infNFe.total.ICMSTot.vNF,
    })
  }

  res.status(200).json(arr)
}
