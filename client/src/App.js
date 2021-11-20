import './App.css';
import Searchbar from './components/Searchbar.jsx';
import Videogames from './components/Videogames.jsx';
import Sortvideogames from './components/Sortvideogames.jsx';
import { Switch, Route } from 'react-router'
import Detail from './components/Detail.jsx';
import Addvideogame from './components/Addvideogame.jsx';
import Landing from './components/Landing';
import FilterGenre from './components/FilterGenre.jsx';
import CreatedByUser from './components/CreatedByUser';
import SortRating from './components/SortRating';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path='/videogame/add'>
          <Addvideogame/>
        </Route>
        <Route exact path='/home'>
          <Searchbar/>   
          <SortRating/>  
          <CreatedByUser/>     
          <Sortvideogames/>
          <FilterGenre/>
          <Videogames/>
        </Route>
        <Route exact path='/videogame/:id'>
          <Detail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
