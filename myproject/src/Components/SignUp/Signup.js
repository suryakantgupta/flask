import React, { useState } from 'react'
import './SignUp.scss';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .max(20, 'Max 20 Characters or less')
        .matches(/^[a-zA-Z0-9]*$/, "Your first name contains invalid characters.")
        .required('This field is required'),
    email: yup
        .string()
        .email('Invalid email. Please check.')
        .required('This field is required'),
    password: yup
        .string()
        .max(20, 'Max 20 Characters or less')
        .matches(/^[a-zA-Z0-9]*$/, "Your password contains invalid characters.")
        .required('Password is required'),
    conpass: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match. Please try again.')
        .required("Confirm Password is required"),
});



const Signup = (props) => {

    const history = useNavigate()

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            password: '',
            conpass: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            props.handleSignupSubmit(values,setOpenSnackbar, setSuccess)
        }
    })

    return (
        <div
            className='signup'
        >
            <form
                style={{
                    width: '40%',
                    marginTop: '30px'
                }}
                onSubmit={formik.handleSubmit}
            >
                <div
                    className="formsection"
                >
                    <TextField
                        label="First Name"
                        variant="outlined"
                        id="firstName"
                        name="firstName"
                        type="text"
                        fullWidth
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        inputProps={{
                            id: 'first_name_new'
                        }}
                    />
                </div>

                <div
                    className="formsection"
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        id="email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        inputProps={{
                            id: 'email_new'
                        }}
                    />
                </div>

                <div
                    className="formsection"
                >
                    <TextField
                        label="Password"
                        variant="outlined"
                        id="password"
                        name="password"
                        type="text"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        inputProps={{
                            id: 'password_new'
                        }}
                    />
                </div>

                <div
                    className="formsection"
                >
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        id="conpass"
                        name="conpass"
                        type="text"
                        fullWidth
                        value={formik.values.conpass}
                        onChange={formik.handleChange}
                        error={formik.touched.conpass && Boolean(formik.errors.conpass)}
                        helperText={formik.touched.conpass && formik.errors.conpass}
                        inputProps={{
                            id: 'password_confirm'
                        }}
                    />
                </div>

                <button
                    className="register-submit-btn"
                >
                    Submit
                </button>
            </form>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                    setOpenSnackbar(false)
                    if (success) {
                        history('/')
                    }
                }}
            >
                <Alert severity={success ? "success" : "error"} sx={{ width: '100%' }}>
                    {success ? "Account Created Successfully" : "Sorry, there is a problem with your registration"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signup
