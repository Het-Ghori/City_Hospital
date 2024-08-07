import * as React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function AddDoctor({ handleSubmitData, onUpdate, setUpdate }) {

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
        designation: Yup
            .string()
            .min(2, 'Designation must be at least 2 characters')
            .required('designation is a required field'),
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
        twitter: Yup
            .string()
            .url()
            .required('Twitter is a required field'),
        facebook: Yup
            .string()
            .url()
            .required('Facebook is a required field'),
        instagram: Yup
            .string()
            .url()
            .required('Instagram is a required field'),
        linkdin: Yup
            .string()
            .url()
            .required('Linkdin is a required field')
    });

    const formik = useFormik({
        initialValues: { name: "", designation: "", desc: "", twitter: "", facebook: "", instagram: "", linkdin: "" },
        validationSchema: validation,
        onSubmit: (values, action) => {
            handleSubmitData(values);
            action.resetForm();
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formik;

    React.useEffect(() => {
        if (onUpdate) {
            formik.setValues(onUpdate)
            handleClickOpen();
        }
    }, [onUpdate]);

    return (
        <>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Doctors</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>Doctor <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 py-4 text-center '><b>Add Doctor</b></DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className='col-12'><p className="mb-0">Doctor Information:</p></div>
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
                            <TextField className='m-0' margin="dense" id="designation" label="Designation" type="text" fullWidth name='designation' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                            />
                            {errors.designation && touched.designation ? (
                                <span className="d-block position-absolute form-error">{errors.designation}</span>
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
                        <div className='col-12'><p className="mb-0 mt-3">Doctor social media info:</p></div>
                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Twitter" fullWidth variant="standard" type="text" name="twitter"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.twitter}
                                size="small"
                            />
                            {errors.twitter && touched.twitter ? (
                                <span className="d-block form-error">{errors.twitter}</span>
                            ) : null}
                        </div>
                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Facebook" fullWidth variant="standard" type="text" name="facebook"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facebook}
                                size="small"
                            />
                            {errors.facebook && touched.facebook ? (
                                <span className="d-block form-error">{errors.facebook}</span>
                            ) : null}
                        </div>
                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Instagram" fullWidth variant="standard" type="text" name="instagram"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.instagram}
                                size="small"
                            />
                            {errors.instagram && touched.instagram ? (
                                <span className="d-block form-error">{errors.instagram}</span>
                            ) : null}
                        </div>
                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Linkdin" fullWidth variant="standard" type="text" name="linkdin"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.linkdin}
                                size="small"
                            />
                            {errors.linkdin && touched.linkdin ? (
                                <span className="d-block form-error">{errors.linkdin}</span>
                            ) : null}
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