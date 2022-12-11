"use client"

import dayjs from 'dayjs'

import { Container } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

type DataTableProps = {
  rows: any[]
}

const columns: GridColDef[] = [
  {
    field: 'empresa',
    headerName: 'Empresa',
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: 'emitente',
    headerName: 'Emitente',
    sortable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: 'cnpjEmitente',
    headerName: 'CNPJ do Emitente',
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: 'nfSerie',
    headerName: 'NF - Série',
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: 'dataHoraEmissao',
    headerName: 'Data/Hora de Emissão',
    sortable: false,
    filterable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => dayjs(params.row.dataHoraEmissao).format('DD/MM/YYYY HH:mm:ss'),
  },
  {
    field: 'valor',
    headerName: 'Valor',
    sortable: false,
    filterable: false,
    width: 150,
    valueGetter: (params: GridValueGetterParams) => Number(params.row.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
]

export default function DataTable({ rows }: DataTableProps) {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          density="compact"
          columns={columns}
          rows={rows}
          selectionModel={[]}
        />
      </div>
    </Container>
  )
}
