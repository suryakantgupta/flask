import React, { useState } from 'react'
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';

/*
yup is used for input field validation
https://www.npmjs.com/package/yup 
*/
const validationSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email. Please check.')
        .required('This field is required'),
    password: yup
        .string()
        .max(20, 'Max 20 Characters or less')
        .matches(/^[a-zA-Z0-9]*$/, "Your password contains invalid characters.")
        .required('Password is required'),
});



const Login = (props) => {

    const history = useNavigate()
/* 
Formik is used for input field,state management and validation
https://formik.org/docs/api/useFormik
*/
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            props.handleLoginSubmit(values, history)
        }
    })

    return (
        <div
            className='login'
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
                    {/* 
               Component code used from Material UI
              https://mui.com/components/text-fields/#main-content
                             */}
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
                            id: 'username'
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
                            id: 'password'
                        }}
                    />
                </div>

                <button
                    className="register-submit-btn"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login
