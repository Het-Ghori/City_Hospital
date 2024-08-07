import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor, deleteDoctor, getDoctors, updateDoctor } from '../../../user/redux/action/doctor.action';
import AddDoctor from './AddDoctorForm';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../../user/UI/loader/Loader';
import ErrorMsg from '../../../user/UI/errorMsg/ErrorMsg'
import { setAlert } from '../../../user/redux/slice/Alert.slice';

export default function Doctors() {
    const [update, setUpdate] = React.useState(null);
    const dispatch = useDispatch();
    const doctorVal = useSelector(state => state.doctors);

    React.useEffect(() => {
        dispatch(getDoctors());
    }, [dispatch]);

    const handleAddData = (data) => {
        if (update) {
            dispatch(updateDoctor(data));
            dispatch(setAlert({ text: 'Doctor successfully update', color: 'success' }))
        } else {
            dispatch(addDoctor(data));
            dispatch(setAlert({ text: 'Doctor successfully added', color: 'success' }))
        }
        setUpdate(null);
    }

    const handleUpdate = (rowData) => {
        setUpdate(rowData)
    }

    const handleDelete = (id) => {
        dispatch(setAlert({ text: 'Doctor successfully deleted', color: 'success' }))
        dispatch(deleteDoctor(id));
    }

    const columns = [
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'designation', headerName: 'Designation', flex: 2 },
        { field: 'desc', headerName: 'Description', flex: 4 },
        { field: 'twitter', headerName: 'Twitter', flex: 2 },
        { field: 'facebook', headerName: 'facebook', flex: 2 },
        { field: 'instagram', headerName: 'instagram', flex: 2 },
        { field: 'linkdin', headerName: 'linkdin', flex: 2 },
        {
            field: 'action', headerName: 'Action', flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" type='button' size='small' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" type='button' size='small' onClick={() => handleDelete(params.row.id)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <div className='data_table' style={{ height: 400, width: '100%' }}>
            {doctorVal.loading ?
                <Loader style={{ height: 'calc(100vh - 64px' }} /> :
                doctorVal.error ?
                    <ErrorMsg style={{ height: "calc(100vh - 64px" }} text={doctorVal.error} /> :
                    <>
                        <AddDoctor handleSubmitData={handleAddData} onUpdate={update} setUpdate={setUpdate} />
                        <DataGrid
                            columns={columns}
                            rows={doctorVal.doctors}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </>
            }
        </div >
    );
}