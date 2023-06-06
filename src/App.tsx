import './App.css';
import Login from './component/Login/Login';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import Product from './component/Product/Product';
import MenuLeft from './component/Menu/Menu';

function App() {
  return (
    <>
      {/* <Login/> */}
      <div className="App">
        <MenuLeft />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
