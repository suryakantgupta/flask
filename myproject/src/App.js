import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Components/SignUp/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
