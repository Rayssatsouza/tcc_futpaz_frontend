/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import { TextField, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get } from '@/data/services/http';
import { FutmanagerTitles } from '@/ui/components/title';
import { FutmanagerSnackbar } from '@/ui/components/snackbar';

export default function ResponsavelView() {
    var { id } = useParams();
    const [responsavel, setResponsavel] = useState({
        nomeCompleto: "",
        dataNascimento: "",
        cpf: "",
        rg: "",
        ativo: 1,
    });
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getResponsavel = useCallback(() => {
        setLoad(true)
        get(`api/responsavel/${id}`).then((response) => {
            setResponsavel(response.data)
            console.log(response.data)
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(_ => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }, [id])

    useEffect(() => {
        if (!responsavel?.id && id != 0) {
            getResponsavel();
        }
    }, [getResponsavel, id, responsavel]);

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/responsavellistview/')
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = "Responsável"

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full'>
                    <div className='flex flex-col items-center'>
                        <TextField className='w-3/5'
                            required
                            label="Nome"
                            name="nomeCompleto"
                            value={responsavel.nomeCompleto}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField className='w-3/5'
                            type='date'
                            required
                            label="Data de Nascimento"
                            name="dataNascimento"
                            value={responsavel.dataNascimento}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField className='w-3/5'
                            required
                            label="CPF"
                            name="cpf"
                            value={responsavel.cpf}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField className='w-3/5'
                            required
                            label="RG"
                            name="rg"
                            value={responsavel.rg}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className='flex float-right p-5 mt-5'>
                    </div>

                </form>
            )}
            {load && (<CircularProgress />)}
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handl
                eClose={closeSnackBar}
            />
        </>
    )
}