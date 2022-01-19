import React, { useState } from 'react'
import './Login.scss';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const history = useNavigate()

    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        let fd = new FormData()

        fd.append('username', state.username)
        fd.append('password', state.password)


        axios.post(`${baseUrl}/login`, fd)
            .then((response) => {
                if(response.data.status == 'success'){
                    localStorage.setItem('token', response.data.token)
                    history('/')
                }else{
                    alert(response.data.message)
                }
            })
    }

    return (
        <div
            className='login'
        >
            <form
                onSubmit={handleSubmit}
                className='form'
            >
                <input
                    placeholder='username'
                    value={state.username}
                    onChange={(e) => setState({ ...state, username: e.target.value })}
                />
                <input
                    placeholder='Password'
                    value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                />

                <button
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login
