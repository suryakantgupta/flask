import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Components/SignUp/Signup';
import Login from './Components/Login/Login';
import PostBlog from './Components/PostBlog/PostBlog';
import Dashboard from './Components/Dashboard/Dashboard';
import Header from './Components/Header/Header';
import Blog from './Components/Blog/Blog';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post-blog" element={<PostBlog />} />
          <Route exact path="/blog/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
