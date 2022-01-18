import React, { useState } from 'react'
import './SignUp.scss';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

const Signup = () => {

    const [state, setState] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        axios.post(`${baseUrl}/signup`, state)
            .then(() => {
                console.log('Success')
            })
    }

    return (
        <div
            className='signup'
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
                    placeholder='Email'
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
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

export default Signup
