import logo from './logo.svg';
import './App.css';
import CatFilterForm from './components/CatFilterForm';
import Cat from './pages/Cat';
import CatList from './pages/CatList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={CatList} />
        <Route path="/breeds/:breedId" exact component={CatList} />
        <Route path="/cat/:catId" exact component={Cat} />
      </BrowserRouter>
    </div>
  );
}

export default App;
