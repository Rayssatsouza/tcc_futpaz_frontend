/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import { get, del } from "@/data/services/http"
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FutmanagerTitles } from '@/ui/components/title';
import { FutmanagerButton } from '@/ui/components/button';
import { FutmanagerSnackbar } from '@/ui/components/snackbar';

export default function CadastroCategoria() {
  const [perfilList, setPerfilList] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getCategorias = useCallback(() => {
    setLoad(true)
    get(`api/categoria?page=${page + 1}&size=${pageSize}`).then((response) => {
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
  }, [page, pageSize]
  )

  const deletarCategoria = (id) => {
    setLoad(true)
    del(`api/categoria/${id}`).then((_) => {
      setLoad(false)
      setSnackOptions(_ => ({ mensage: "Categoria deletada com Sucesso", type: "success", open: true }));
      getCategorias()
    }).catch((erro) => {
      setSnackOptions(_ => ({
        mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
        type: "error",
        open: true
      }));
      setLoad(false)
    });
  }

  useEffect(() => {
    getCategorias();
  }, [getCategorias, page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createItem = () => {
    startTransition(() => {
      navegacao(`/cadastroCategoriaForm/0`)
    });
  }

  const columns = [
    {
      field: 'caminhoImagem', headerName: 'Foto', width: 250,
      renderCell: (params) => {
        return (
          <img
            src={params.row.caminhoImagem}
            className='w-5/6'
          />
        );
      }
    },
    { field: 'categoria', headerName: 'Categoria', width: 250 },
    {
      field: 'ativo', headerName: 'Ativo', width: 100,
      renderCell: (params) => {
        return (
          params.value ? 'SIM' : 'NÃO'
        );
      }
    },
    { field: 'created_at', headerName: 'Data de Criação', width: 200 },
    { field: 'updated_at', headerName: 'Data de Atualização', width: 200 },
    {
      field: 'edit_button', headerName: 'Editar', width: 75,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/cadastroCategoriaForm/${params.row.id}`)
              });
            }}>
            <EditIcon />
          </IconButton>
        );
      }
    },
    {
      field: 'delete_button', headerName: 'Deletar', width: 75,
      renderCell: (params) => {
        return (
          <IconButton
            color="error"
            onClick={() => {
              deletarCategoria(params.row.id);
            }}>
            <DeleteIcon />
          </IconButton>
        );
      }
    },
  ];

  return (
    <>
      <FutmanagerTitles title={"Categorias Cadastradas"} />
      <FutmanagerButton className='pl-6' color="primary" click={createItem} icon={<AddIcon />} />
      <DataGrid
        className='m-3'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={perfilList?.data || []}
        getRowId={(row) => row.id}
        getRowHeight={(_) => 150}
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