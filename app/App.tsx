"use client"

import { useState } from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
import { ptBR as dataGridPtBr } from '@mui/x-data-grid'
import { LocalizationProvider, ptBR as datePickerPtBR } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import SearchForm from './SearchForm'
import DataTable from './DataTable'

import empresas from '@/utils/empresas'

const theme = createTheme({}, dataGridPtBr, datePickerPtBR, ptBR)

export default function App() {
  const [rows, setRows] = useState<any[]>([])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <SearchForm empresas={empresas} setRows={setRows} />
        <DataTable rows={rows} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
