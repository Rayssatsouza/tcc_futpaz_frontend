/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import { Button, TextField, CircularProgress, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '@/data/services/http';
import { FutmanagerTitles } from '@/ui/components/title';
import { FutmanagerSnackbar } from '@/ui/components/snackbar'

export default function CadastroAdvertenciaForm() {
    var { id } = useParams();
    const [item, setItem] = useState({
        tipoAdvertencia: '',
        ativo: 1
    });
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getAdvertencia = useCallback(() => {
        setLoad(true)
        get(`api/advertenciaTipo/${id}`).then((response) => {
            setItem(response.data)
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

    const editarAdvertencia = (body) => {
        setLoad(true)
        put(`api/advertenciaTipo/${id}`, body).then((_) => {
            setSnackOptions(_ => ({
                mensage: "Tipo de Advertência atualizado com Sucesso",
                type: "success",
                open: true
            }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/cadastroAdvertenciaTipo')
            }, 3000);
        }).catch((erro) => {
            setSnackOptions(_ => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

    const criarAdvertencia = (body) => {
        setLoad(true)
        post(`api/advertenciaTipo`, body).then((_) => {
            setSnackOptions(_ => ({ mensage: "Tipo de Advertência criado com Sucesso", type: "success", open: true }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/cadastroAdvertenciaTipo')
            }, 3000);
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
        if (!item?.id && id != 0) {
            getAdvertencia();
        }
    }, [getAdvertencia, id, item]);

    const salvarAdvertencia = (event) => {
        event.preventDefault();
        var body = {
            ...item,
        }
        if (id == 0) criarAdvertencia(body)
        else editarAdvertencia(body)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({
            ...item,
            [name]: value,
        });
    };

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/cadastroAdvertenciaTipo')
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? "Cadastrar Tipo de Advertência" : "Editar Tipo de Advertência"

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full flex flex-col items-center' onSubmit={salvarAdvertencia}>
                    <TextField className='w-3/5'
                        required
                        label="Tipo de Advertência"
                        name="tipoAdvertencia"
                        value={item.tipoAdvertencia}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/5'
                        required
                        select
                        name='ativo'
                        value={item.ativo}
                        label="Ativo"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        <MenuItem value={1}>SIM</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
                    </TextField>

                    <div className='mt-6 self-end p-5'>
                        <Button type="submit" variant="contained" className='bg-green-600 hover:bg-green-700'
                            startIcon={<SaveIcon />}>
                            Salvar
                        </Button>
                    </div>
                </form>
            )}
            {load && (<CircularProgress />)}
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handleClose={closeSnackBar} />
        </>
    )
}