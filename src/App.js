import './App.css';
import {landingPage} from './_blueprint.js';
import {basePage} from './_construction.js';

function App() {
  return (<div>
      {basePage("Handshake TLD Hub", "green")} 
      {landingPage()}
      </div>);
}

export default App;
