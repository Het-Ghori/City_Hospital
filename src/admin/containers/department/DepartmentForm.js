import * as React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function AddDepartment({ handleSubmitData, onUpdate, setUpdate }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
        formik.resetForm();
        setUpdate(null);
    }
    const validation = Yup.object({
        name: Yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .matches(/^[a-zA-Z. ]+$/, "name is invalid")
            .required('Name is a required field'),
        desc: Yup.string()
            .test("message", "Enter Maximum 100 Word", function (value) {
                let ary = value.split(" ");
                if (ary.length > 100) {
                    return false;
                } else {
                    return true;
                }
            })
            .required('Description is a required field'),
        prec: Yup
            .mixed()
            .required('Prescription is required')
    });

    const formik = useFormik({
        initialValues: { name: "", desc: "" },
        validationSchema: validation,
        onSubmit: (values, action) => {
            handleSubmitData(values);
            action.resetForm();
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, touched, errors, values, setFieldValue } = formik;

    React.useEffect(() => {
        if (onUpdate) {
            formik.setValues(onUpdate)
            handleClickOpen();
        }
    }, [onUpdate]);

    return (
        <>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Department</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>Department <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 py-4 text-center '><b>Add Department</b></DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="name" label="Name" type="text" fullWidth name='name' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name ? (
                                <span className="d-block position-absolute form-error">{errors.name}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="desc" label="Description" type="text" fullWidth multiline rows={3} name='desc' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.desc}
                            />
                            {errors.desc && touched.desc ? (
                                <span className="d-block position-absolute form-error">{errors.desc}</span>
                            ) : null}
                        </div>
                        <div className="col-md-12 form-group mt-3">
                            <input type="file" name="prec" className="form-control" id="prec"
                                onChange={(event) => setFieldValue("prec", event.target.files[0])} />
                            {errors.prec && touched.prec ? <span className='form-error'>{errors.prec}</span> : null}
                            {
                                values.prec ? <img style={{ width: '100%' }} src={typeof values.prec === 'string' ? values.prec : URL.createObjectURL(values.prec)} alt={values.prec} />
                                    : null}
                        </div>

                        <div className='pt-3 col-12 text-center'>
                            <Button className='me-3' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Add</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    );
}