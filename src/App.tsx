import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import Product from './component/Product/Product';
import MenuLeft from './component/Menu/Menu';
import '@/styles/prime.css';
import ManagerRolePermission from './component/ManagerPermission/managerPermission';
        
function App() {
  return (
    <div className="App">
      <MenuLeft />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/permission' element={<ManagerRolePermission />} />
      </Routes>
    </div>
  );
}

export default App;
