/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import { get } from "@/data/services/http"
import { CircularProgress, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { startTransition } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FutmanagerTitles } from '@/ui/components/title';
import { FutmanagerButton } from '@/ui/components/button';
import { FutmanagerSnackbar } from '@/ui/components/snackbar';

export default function AtletaList() {
  var { id } = useParams();
  const [perfilList, setPerfilList] = useState({});
  const [categoria, setCategoria] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getCategoria = useCallback(() => {
    setLoad(true)
    get(`api/categoria/${id}`).then((response) => {
      setCategoria(response.data)
      setLoad(false)
    }).catch((erro) => {
      setSnackOptions(_ => ({
        mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
        type: "error",
        open: true
      }));
      setLoad(false)
    });
  }, [id])

  const getAtletas = useCallback(() => {
    setLoad(true)
    get(`api/atletaSub/${id}?page=${page + 1}&size=${pageSize}`).then((response) => {
      setPerfilList(response.data)
      setLoad(false)
    }).catch((erro) => {
      setSnackOptions(_ => ({
        mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
        type: "error",
        open: true
      }));
      setLoad(false)
    });
  }, [id, page, pageSize])

  useEffect(() => {
    getCategoria();
    getAtletas();
  }, [getAtletas, getCategoria, page, pageSize, perfilList]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createItem = () => {
    startTransition(() => {
      navegacao(`/atletaForm/0/` + id)
    });
  }

  const columns = [
    {
      field: 'caminhoImagem', headerName: 'Foto', width: 200,
      renderCell: (params) => {
        return (
          <img
            style={{ width: '100px', height: '100px' }}
            src={params.row.caminhoImagem}
          />
        );
      }
    },
    { field: 'nomeCompleto', headerName: 'Nome Completo', width: 300 },
    { field: 'numAdvertencia', headerName: 'Nro. Advertencias', width: 100 },
    { field: 'nomeUniforme', headerName: 'Nome no Uniforme', width: 200 },
    { field: 'idade', headerName: 'Idade', width: 100 },
    { field: 'numeroUniforme', headerName: 'Número', width: 100 },
    { field: 'posicao', headerName: 'Posição', width: 75 },
    {
      field: 'edit_button', headerName: 'Editar', width: 75,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/atletaForm/${params.row.id}/${id}`)
              });
            }}>
            <EditIcon />
          </IconButton>
        );
      }
    },
  ];

  const voltarPagina = () => {
    startTransition(() => {
      navegacao('/atletaMenu/')
    });
  };

  return (
    <>
      {load && (<CircularProgress />)}
      <FutmanagerTitles title={categoria.categoria} back={voltarPagina} />
      <FutmanagerButton className='pl-6' color="primary" click={createItem} icon={<AddIcon />} />
      <DataGrid
        className='m-3'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={perfilList?.data || []}
        getRowId={(row) => row.id}
        getRowHeight={() => 100}
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
        rowCount={perfilList?.pagination?.total_records || 0}
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