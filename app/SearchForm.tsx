"use client"

import dayjs, { Dayjs } from 'dayjs'
import { useState, useCallback } from 'react'

import Grid from '@mui/material/Unstable_Grid2'
import { Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import type { Empresa } from '@/utils/empresas'

type SearchFormProps = {
  empresas: Empresa[]
  setRows: React.Dispatch<React.SetStateAction<any[]>>
}

export default function SearchForm({ empresas, setRows }: SearchFormProps) {
  const [empresa, setEmpresa] = useState(empresas[0])
  const [emitente, setEmitente] = useState('')
  const [cnpjEmitente, setCnpjEmitente] = useState('')
  const [dataInicial, setDataInicial] = useState<Dayjs|null>(dayjs())
  const [dataFinal, setDataFinal] = useState<Dayjs|null>(dayjs())

  const [message, setMessage] = useState('Clique em buscar notas para começar!')
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async () => {
    setMessage('Buscando notas...')
    setLoading(true)
    setRows([])

    const body = {
      empresa: empresa.value,
      emitente,
      cnpjEmitente,
      dataInicial: dataInicial?.format('YYYY-MM-DD'),
      dataFinal: dataFinal?.format('YYYY-MM-DD'),
    }

    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    setLoading(false)

    if (!response.ok) {
      setMessage('Erro ao buscar notas!')
      return
    }

    const data = await response.json()

    setMessage(`${data.length} nota(s) encontrada(s)!`)

    setRows(
      data.sort(
        (a: any, b: any) => dayjs(b.dataHoraEmissao).diff(dayjs(a.dataHoraEmissao))
      )
    )
  }, [empresa, emitente, cnpjEmitente, dataInicial, dataFinal, setRows])

  return (
    <Container maxWidth="xl">
      <Paper variant="outlined" sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Empresa</InputLabel>
              <Select label="Empresa" value={empresa?.value} onChange={e => setEmpresa(empresas.find(emp => e.target.value === emp.value)!)}>
                {empresas.map(e => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={6} sm={5} md={3} lg={3}>
            <TextField
              size="small"
              label="Emitente"
              value={emitente}
              onChange={e => setEmitente(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={3}>
            <TextField
              size="small"
              label="CNPJ do Emitente"
              value={cnpjEmitente}
              onChange={e => setCnpjEmitente(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid xs={6} sm={6} md={2}>
            <DatePicker
              label="Data Inicial"
              value={dataInicial}
              onChange={value => setDataInicial(value)}
              renderInput={params => <TextField size="small" fullWidth {...params} />}
            />
          </Grid>

          <Grid xs={6} sm={6} md={2}>
            <DatePicker
              label="Data Final"
              value={dataFinal}
              onChange={value => setDataFinal(value)}
              renderInput={params => <TextField size="small" fullWidth {...params} />}
            />
          </Grid>

          <Grid xs={12} sm={9} md={10} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {loading && <CircularProgress size={20} sx={{ marginRight: 1 }} />}
            <Typography variant="caption">{message}</Typography>
          </Grid>

          <Grid xs={12} sm={3} md={2}>
            <Button size="small" variant="contained" onClick={handleSearch} fullWidth>Buscar Notas</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
