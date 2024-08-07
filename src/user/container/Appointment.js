import React, { useEffect } from 'react';
import Button from '../UI/button/Button';
import TitleBox from '../UI/titlePart/TitleBox';
import * as Yup from "yup"
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addApt, deleteApt, getApt, updateApt } from '../redux/slice/AptSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AptForm from '@mui/icons-material/Today';
import AptList from '@mui/icons-material/ReceiptLong';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { setAlert } from '../redux/slice/Alert.slice';

function Appointment() {
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = React.useState(0);
    const apt = useSelector((state) => state.apt);
    const [update, setUpdate] = React.useState(false);

    useEffect(() => {
        dispatch(getApt());
    }, [])

    const SignUpSchema = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z ]+$/, "Name must only contain characters.")
            .min(2)
            .required("Please enter your name."),
        email: Yup.string()
            .email()
            .required("Please enter email address."),
        mobile: Yup.number()
            .integer()
            .typeError('Mobile number must be a number')
            .required('Mobile number is required')
            .test('len', 'Mobile number must be exactly 10 digits', val => val && val.toString().length === 10),
        date: Yup.date()
            .min(new Date(), 'Appointment date cannot be in the past')
            .required('Appointment date is required'),
        department: Yup
            .string()
            .required('Department is required'),
        prec: Yup
            .mixed()
            .required('Prescription is required'),
        message: Yup
            .mixed()
            .test(
                "message",
                "Maximum 5 words allowed.",
                function (value) {
                    if (value) {
                        let messageWords = value.split(" ");
                        return messageWords.length <= 10;
                    }
                    return true;
                }
            )
    });

    const initialValues = { name: '', email: '', mobile: '', date: '', department: '', prec: '', message: '' }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        validationSchema: SignUpSchema,
        initialValues: initialValues,
        onSubmit: (values, action) => {
            if (update) {
                dispatch(updateApt(values))
                dispatch((setAlert({ text: 'Dear, ' + values.name + ' Your appointment successfully updated.', color: 'success' })))
            } else {
                dispatch(addApt(values))
                dispatch((setAlert({ text: 'Dear, ' + values.name + ' Your appointment successfully sent', color: 'success' })))
            }
            setTabValue(1);
            action.resetForm();
            setUpdate(false)
        }
    });

    const handleTab = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const handleUpdate = (rowData) => {
        setValues(rowData);
        setTabValue(0);
        setUpdate(true);
    }

    const handleDelete = (rowData) => {
        dispatch(deleteApt(rowData))
    }

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'date', headerName: 'Data', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'mobile', headerName: 'Mobile', flex: 1 },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'message', headerName: 'Message', flex: 2 },
        {
            field: 'action', headerName: 'Action', sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" type='button' size='small' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" type='button' size='small' onClick={() => handleDelete(params.row)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <main>
            <section id="appointment" className="appointment">
                <div className="container">
                    <TitleBox
                        className='pb-2'
                        titleText={tabValue === 0 ? 'Make an Appointment' : 'List of Appointments'}
                        subTitleText={tabValue === 0 ? ['Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibu blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor. Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.'] :
                            ['Aenean enim orci, suscipit vitae sodales ac, semper in ex. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor. Nunc aliquam eget nibh eu euismod. Donec dapibu blandit quam volutpat sollicitudin.']} />
                    <div className='pb-5 d-flex justify-content-center'>
                        <Tabs value={tabValue} onChange={handleTab} className='orange_tab'>
                            <Tab className='pb-1' icon={<AptForm className='mb-2' />}
                                label="Book Appointment"
                                sx={{
                                    color: tabValue === 0 ? 'orange' : 'inherit',
                                }} />
                            <Tab className='pb-1' icon={<AptList className='mb-2' />} label="List Appointment" />
                        </Tabs>
                    </div>
                    {
                        tabValue === 0 ?
                            <form onSubmit={handleSubmit} className="php-email-form">
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.name && touched.name ? <span className='form-error'>{errors.name}</span> : null}
                                    </div>
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.email && touched.email ? <span className='form-error'>{errors.email}</span> : null}
                                    </div>
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input type="text" className="form-control" name="mobile" id="mobile" placeholder="Your Mobile Number"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.mobile && touched.mobile ? <span className='form-error'>{errors.mobile}</span> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group mt-3">
                                        <input type="datetime-local" name="date" className="form-control" id="date" placeholder="Appointment Date"
                                            value={values.date}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.date && touched.date ? <span className='form-error'>{errors.date}</span> : null}
                                    </div>
                                    <div className="col-md-4 form-group mt-3">
                                        <select
                                            name="department"
                                            id="department"
                                            className="form-select"
                                            value={values.department}
                                            onChange={handleChange}
                                            onBlur={handleBlur}>
                                            <option value="">Select Department</option>
                                            <option value="Department 1">Department 1</option>
                                            <option value="Department 2">Department 2</option>
                                            <option value="Department 3">Department 3</option>
                                        </select>
                                        {errors.department && touched.department ? <span className='form-error'>{errors.department}</span> : null}
                                    </div>
                                    <div className="col-md-4 form-group mt-3">
                                        <input type="file" name="prec" className="form-control" id="prec"
                                            onChange={(event) => setFieldValue("prec", event.target.files[0])} />
                                        {errors.prec && touched.prec ? <span className='form-error'>{errors.prec}</span> : null}
                                        {
                                            values.prec ? <img width={'100%'} src={typeof values.prec === 'string' ? values.prec : URL.createObjectURL(values.prec)} alt={values.prec} />
                                                : null}
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea className="form-control" name="message" rows={5} placeholder="Message (Optional)"
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {errors.message && touched.message ? <span className='form-error'>{errors.message}</span> : null}
                                </div>
                                <div className="text-center mt-5">
                                    <div className="text-center"><Button>{update ? 'Update an Appointment' : 'Make an Appointment'}</Button></div>
                                </div>
                            </form>
                            : apt.apt.length > 0 ?
                                <div className='user_data_table' style={{ width: '100%' }}>
                                    <DataGrid
                                        columns={columns}
                                        rows={apt.apt}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 20]}
                                    />
                                </div>
                                : null
                    }
                </div>
            </section>
        </main>
    );
}

export default Appointment;