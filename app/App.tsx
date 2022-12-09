"use client"

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider, ptBR } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type AppProps = {
  children: React.ReactNode
}

const theme = createTheme({}, ptBR)

export default function App({ children }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}
