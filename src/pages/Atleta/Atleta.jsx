/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { post } from '@/data/services/http';
import AtletaForms from "./AtletaForms";
import { FutmanagerSnackbar } from '@/ui/components/snackbar';

export default function CenarioFrm() {
    var { id } = useParams();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });


    const createItem = (body) => {
        setLoad(true)
        post(`api/atleta`, body).then((_) => {
            setSnackOptions(_ => ({ mensage: "Atleta criado com Sucesso", type: "success", open: true }));
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(_ => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? <Typography className='text-blue-fut-paz-900' variant="h4" gutterBottom>
        Cadastro de Atleta
    </Typography> : <Typography variant="h4" gutterBottom>
        Editar
    </Typography>

    var form = !load ?
        <AtletaForms titulo={titulo} id={id} createItem={createItem} /> : <CircularProgress />

    return (
        <>
            <div className=''>
                {form}
            </div>
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handleClose={closeSnackBar} />
        </>
    )
}