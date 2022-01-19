import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Components/SignUp/Signup';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
