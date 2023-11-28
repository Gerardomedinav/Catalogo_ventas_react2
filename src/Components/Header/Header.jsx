import logo from './logo.png';
import './Header.css';
function Header (){
    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="titles-container">
          <h1>Catalogo de Ventas</h1>
          <h1>Codigo Urbano</h1>
        </div>
      </header>
    )
}
export default Header