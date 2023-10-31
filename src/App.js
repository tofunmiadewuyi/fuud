import './App.css';
import Dashboard from './Dashboard';
import Home from './Landing'
import TopBar from './TopBar';
import DiscoverPage from './DiscoverPage';

function App() {
  return (
    <div className="App">
      <TopBar user='Tofunmi'/>
      <DiscoverPage/>
      <div className='creator'>Made with 🍏 by 7ofunm1</div>
    </div>
  );
}

export default App;
