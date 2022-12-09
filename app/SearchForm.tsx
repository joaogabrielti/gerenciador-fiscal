"use client"

import { Dayjs } from 'dayjs'
import { useState } from 'react'

import Grid from '@mui/material/Unstable_Grid2'
import { Button, Container, Paper, TextField } from '@mui/material'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import type { Empresa } from '@/utils/empresas'

type SearchFormProps = {
  empresas: Empresa[]
}

export default function SearchForm({ empresas }: SearchFormProps) {
  const [empresa, setEmpresa] = useState(empresas[0])
  const [emitente, setEmitente] = useState('')
  const [cnpjEmitente, setCnpjEmitente] = useState('')
  const [dataInicial, setDataInicial] = useState<Dayjs|null>()
  const [dataFinal, setDataFinal] = useState<Dayjs|null>()

  return (
    <Container maxWidth="xl">
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Empresa</InputLabel>
              <Select label="Empresa" value={empresa?.value} onChange={e => setEmpresa(empresas.find(emp => e.target.value === emp.value)!)}>
                {empresas.map(e => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={6} sm={5} md={3} lg={3} xl={2}>
            <TextField
              size="small"
              label="Emitente"
              value={emitente}
              onChange={e => setEmitente(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={3} xl={2}>
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

          <Grid xs={6} xsOffset={6} sm={3} smOffset={9} md={2} mdOffset={10}>
            <Button size="small" variant="contained" fullWidth>Buscar Notas</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
