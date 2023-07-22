import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
import './Login.css';
import Login from './Login';
import MainView from './components/MainView';
import ChildView from './components/ChildMainView/ChildView'

const App = () => {
  return (
    // <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainView" element={<MainView />} />
        <Route path="/dataTable/:id" element={<ChildView/>} />
      </Routes>
    </div>
      
    // </BrowserRouter>
  );
  
};

export default App;
