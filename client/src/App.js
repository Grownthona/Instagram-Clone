import React from 'react';
//import Home from './Home/Home';
import Instagram from './Home/Instagram';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
     <Route exact path='/' element={<Instagram/>}></Route>
   </Routes>
 </Router>
  );
}

export default App;
