import logo from './logo.svg';
import './App.css';
import CatFilterForm from './components/CatFilterForm';
import Cat from './pages/Cat';
import CatList from './pages/CatList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CatContextProvider from './context/CatContext';

function App() {
  return (
    <div className="App">
      <CatContextProvider>
        <BrowserRouter>
          <Route path="/" exact component={CatList} />
          <Route path="/breeds/:breedId" exact component={CatList} />
          <Route path="/cat/:catId" exact component={Cat} />
        </BrowserRouter>
      </CatContextProvider>
    </div>
  );
}

export default App;
