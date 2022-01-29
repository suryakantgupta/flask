import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './Components/SignUp/Signup';
import Login from './Components/Login/Login';
import PostBlog from './Components/PostBlog/PostBlog';
import Dashboard from './Components/Dashboard/Dashboard';
import Header from './Components/Header/Header';
import Blog from './Components/Blog/Blog';
import axios from 'axios';
import { baseUrl } from './baseUrl';
import { useState } from 'react';
import LoginError from './Components/Login/LoginError/LoginError';
import Footer from './Components/Footer/Footer';

function App() {
  const [firstName, setFirstName] = useState("Guest");

  const handleLoginSubmit = (values, history, setError) => {
    let fd = new FormData()

    fd.append('email', values.email)
    fd.append('password', values.password)

    axios.post(`${baseUrl}/login`, fd)
      .then((response) => {
        if (response.data.status == 'success') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('firstName', response.data.firstName)
          setFirstName(response.data.firstName)
          history('/')
        } else {
          // alert(response.data.message)
          history('/loginerror')
        }
      })
      .catch(() => {
        history('/loginerror')
      })

  }

  const handleSignupSubmit = (values, setOpenSnackbar, setSuccess) => {
    let fd = new FormData()

    fd.append('firstName', values.firstName)
    fd.append('email', values.email)
    fd.append('password', values.password)

    axios.post(`${baseUrl}/register`, fd)
      .then((response) => {
        setOpenSnackbar(true)
        setSuccess(true)
      })
      .catch(() => {
        setOpenSnackbar(true)
        setSuccess(false)
      })
  }


  return (
    <div className="App">
      <Router>
        <Header firstName={firstName} setFirstName={setFirstName} />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/register" element={<Signup handleSignupSubmit={handleSignupSubmit} />} />
          <Route exact path="/login" element={<Login handleLoginSubmit={handleLoginSubmit} />} />
          <Route exact path="/loginerror" element={<LoginError />} />
          <Route exact path="/post-blog" element={<PostBlog />} />
          <Route exact path="/blog/:id" element={<Blog />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
