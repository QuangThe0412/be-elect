import './App.css';
import Login from './component/Login/Login';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 
import Menu from './component/Menu/Menu';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Menu/>
    </div>
  );
}

export default App;
