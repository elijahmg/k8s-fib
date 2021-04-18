import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import OtherPage from "./OtherPage";
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page</Link>
        </header>
        <>
          <Route exact path="/" component={Fib}/>
          <Route path="/otherpage" component={OtherPage}/>
        </>
      </div>

    </Router>
  );
}

export default App;
