import { useState, useEffect, useCallback } from 'react'
import { get } from "@/data/services/http"
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FutmanagerTitles } from '@/ui/components/title';
import { FutmanagerButton } from '@/ui/components/button';
import { FutmanagerSnackbar } from '@/ui/components/snackbar';

export default function Chamada() {
  const [chamadas, setChamadas] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getChamadas = useCallback(() => {
    setLoad(true)
    get(`api/chamada?page=${page + 1}&size=${pageSize}`).then((response) => {
      setChamadas(response.data)
      setLoad(false)
    }).catch((erro) => {
      // eslint-disable-next-line no-unused-vars
      setSnackOptions(_ => ({
        mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
        type: "error",
        open: true
      }));
      setLoad(false)
    });
  }, [page, pageSize])

  useEffect(() => {
    getChamadas();
  }, [getChamadas, page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createItem = () => {
    startTransition(() => {
      navegacao(`/chamadasForm/0`)
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'dataChamada', headerName: 'Data Chamada', width: 300 },
    { field: 'horaChamada', headerName: 'Horário', width: 200 },
    {
      field: 'categoria_id', headerName: 'Categoria', width: 250,
      renderCell: (params) => {
        return params.row.categoria.categoria;
      }
    },
    {
      field: 'finalizada', headerName: 'Finalizada', width: 150,
      renderCell: (params) => {
        return (
          params.value ? 'SIM' : 'NÃO'
        );
      }
    },
    {
      field: 'edit_button', headerName: 'Editar', width: 75,
      renderCell: (params) => {
        if (params.row.finalizada) {
          return ""
        } else {
          return (
            <IconButton
              color="primary"
              onClick={() => {
                startTransition(() => {
                  navegacao(`/chamadasForm/${params.row.id}`)
                });
              }}>
              <EditIcon />
            </IconButton>
          );
        }
      }
    },
    {
      field: 'acessar', headerName: 'Acessar', width: 75,
      renderCell: (params) => {
        if (params.row.finalizada) {
          return (
            <IconButton
              color="primary"
              onClick={() => {
                startTransition(() => {
                  navegacao(`/presencasView/${params.row.id}`)
                });
              }}>
              <ContentPasteSearchIcon />
            </IconButton>
          );
        }
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/presencas/${params.row.id}`)
              });
            }}>
            <ContentPasteSearchIcon />
          </IconButton>
        );
      }
    },
  ];

  return (
    <>
      <FutmanagerTitles title={"Chamadas Cadastradas"} />
      <FutmanagerButton className='pl-6' color="primary" click={createItem} icon={<AddIcon />} />
      {console.log('atletaList:', chamadas?.data)}
      {console.log('columns:', columns)}
      <DataGrid
        className='m-3'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={chamadas?.data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: pageSize },
          },
        }}
        onPaginationModelChange={(model) => {
          setPage(model.page)
          setPageSize(model.pageSize)
        }}
        paginationModel={{ page: page, pageSize: pageSize }}
        pageSize={pageSize}
        rowCount={chamadas?.pagination?.total_records || 0}
        pageSizeOptions={[10, 25, 50]}
      />
      <FutmanagerSnackbar
        mensage={snackOptions.mensage}
        type={snackOptions.type}
        open={snackOptions.open}
        handleClose={closeSnackBar} />
    </>
  )
}