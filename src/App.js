import {React,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import './Login.css';
import Login from './Login';
import MainView from './components/MainView';
import ChildView from './components/ChildMainView/ChildView'

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear the isLoggedIn variable when the tab is closed
      localStorage.removeItem("isLoggedIn");
    };

    // Add the event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
