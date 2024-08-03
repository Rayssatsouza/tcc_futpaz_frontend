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

export default function CadastroPerfilForm() {
    var { id } = useParams();
    const [item, setItem] = useState({
        perfil: '',
        ativo: 1
    });
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getPerfil = useCallback(() => {
        setLoad(true)
        get(`api/perfil/${id}`).then((response) => {
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

    const editarPerfil = (body) => {
        setLoad(true)
        put(`api/perfil/${id}`, body).then((_) => {
            setSnackOptions(_ => ({
                mensage: "Perfil atualizado com Sucesso",
                type: "success",
                open: true
            }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/cadastroPerfil')
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

    const criarPerfil = (body) => {
        setLoad(true)
        post(`api/perfil`, body).then((_) => {
            setSnackOptions(_ => ({ mensage: "Perfil criado com Sucesso", type: "success", open: true }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/cadastroPerfil')
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
            getPerfil();
        }
    }, [getPerfil, id, item]);

    const salvarPerfil = (event) => {
        event.preventDefault();
        var body = {
            ...item,
        }
        if (id == 0) criarPerfil(body)
        else editarPerfil(body)
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
            navegacao('/cadastroPerfil')
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? "Cadastrar Perfil" : "Editar Perfil"

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full flex flex-col items-center' onSubmit={salvarPerfil}>
                    <TextField className='w-3/5'
                        required
                        label="Perfil"
                        name="perfil"
                        value={item.perfil}
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