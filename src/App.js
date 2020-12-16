import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Index from '../src/components/crud/Index'
function App() {
  return (
    <Router>
        <div className="App">
      
            <Route name="/" component={Index}/>
        
        </div>
    </Router>
  );
}

export default App;
