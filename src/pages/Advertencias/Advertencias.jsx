import { useState, useEffect, useCallback } from 'react'
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { get } from '@/data/services/http';
import { getUser } from '@/data/services/storage';
import { DataGrid } from '@mui/x-data-grid';
import { FutmanagerSnackbar } from '@/ui/components/snackbar';

export default function Advertencias() {
    var { id } = useParams();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [advertencia, setAdvertencia] = useState({});
    const [atleta, setAtleta] = useState({});
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });

    const getAdvertencias = () => {
        setLoad(true)
        get(`api/advertencia`).then((response) => {
            setAdvertencia(response.data)
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
    }

    useEffect(() => {
        getAdvertencias();
        getAtleta();
    }, [getAtleta]);

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    const user = getUser();

    const getAtleta = useCallback(() => {
        setLoad(true)
        get(`api/atleta/${user.atleta_id}`).then((response) => {
            setAtleta(response.data)
            console.log(response.data)
            setLoad(false)
        }).catch((erro) => {
            // eslint-disable-next-line no-unused-vars
            setSnackOptions(_ => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }, [user.atleta_id])

    var titulo = atleta.nomeCompleto ? atleta.nomeCompleto : ""

    console.log("Advertencias", advertencia)

    const columns = [
        { field: 'data', headerName: 'Data da Advertência', width: 250 },
        {
            field: 'advertencia_tipo', headerName: 'Tipo de Advertência', width: 250,
            renderCell: (params) => (
                params.row.advertencia_tipo.tipoAdvertencia
            ),
        },
        { field: 'justificativa', headerName: 'Justificativa da Advertência', width: 250 },
    ];

    return (
        <>
            <div className='w-full'>
                <div className='flex justify-center items-center'>
                    <h3 className="text-2xl p-4 text-blue-fut-paz-900 m-3 font-bold">{titulo}</h3>
                </div>
                <div className='m-8 mt-2 flex'>
                    <DataGrid
                        className='m-3'
                        sx={{ width: '80%' }}
                        loading={load}
                        rows={advertencia?.data || []}
                        columns={columns}
                    />
                </div>
            </div>
            {load && (<CircularProgress />)}
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handleClose={closeSnackBar} />
        </>
    )
}