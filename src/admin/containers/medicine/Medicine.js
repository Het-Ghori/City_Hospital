import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddMedicine from './AddMedicineForm';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicineData, deleteMedicineData, getMedicineData, updateMedicineData } from '../../../user/redux/action/medicine.action';
import Loader from '../../../user/UI/loader/Loader';
import ErrorMsg from '../../../user/UI/errorMsg/ErrorMsg';
import { setAlert } from '../../../user/redux/slice/Alert.slice';

export default function Medicine() {
    const [update, setUpdate] = React.useState(null);
    const dispatch = useDispatch();
    const medicineState = useSelector(state => state.medicines);

    React.useEffect(() => {
        dispatch(getMedicineData());
    }, [dispatch]);

    const handleSubmitData = (data) => {
        if (update) {
            dispatch(updateMedicineData(data))
            dispatch(setAlert({text: 'Medicine successfully update', color: 'success'}))
        } else {
            dispatch(addMedicineData(data));
                  dispatch(setAlert({text: 'Medicine successfully added', color: 'success'}))
        }
        setUpdate(null);
    }

    const handleUpdate = (row) => {
        setUpdate(row)
    }
    const handleDelete = (id) => {
         dispatch(setAlert({text: 'Medicine successfully deleted', color: 'success'}))
        dispatch(deleteMedicineData(id));
    }

    const columns = [
        { field: 'mediname', headerName: 'Name', flex: 2 },
        { field: 'mediprice', headerName: 'Price', flex: 1 },
        { field: 'mediexpiry', headerName: 'Expiry Date', flex: 2 },
        { field: 'medidesc', headerName: 'Description', flex: 6 },
        {
            field: 'action', headerName: 'Action', flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" type='button' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" type='button' onClick={() => handleDelete(params.row.id)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <div className='data_table' style={{ height: 400, width: '100%' }}>
            {medicineState.loading ?
                <Loader style={{ height: 'calc(100vh - 64px)' }} /> :
                medicineState.error ?
                    <ErrorMsg style={{height: 'calc(100vh - 64px'}} text={medicineState.error} /> :
                    <>
                        <AddMedicine handleSubmitData={handleSubmitData} onUpdate={update} setUpdate={setUpdate} />
                        <DataGrid
                            columns={columns}
                            rows={medicineState.medicines}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </>
            }

        </div>
    );
}
