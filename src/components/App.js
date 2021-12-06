import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Import Components
import Nav from './Nav';
import SearchForm from './SearchForm';
import Gallery from './Gallery';
import SearchContainer from './SearchContainer';
import NotFound from './NotFound';
import Home from './Home';
import apiKey from './config.js';

// saving API key value in a variable
const apiK = apiKey;

// main Class container
class App extends Component {

  state = {catsImages: [], dogsImages: [], frogsImages: []}

  componentDidMount() {
    this.performSearchCats('cats');
    this.performSearchDogs('dogs');
    this.performSearchFrogs('frogs');
  }

  performSearchDogs = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiK}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => this.setState({dogsImages: responseData.photos.photo}))
      .catch(err => console.log('Error fetching data: ', err))
  }

  performSearchCats = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiK}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => this.setState({catsImages: responseData.photos.photo}))
      .catch(err => console.log('Error fetching data: ', err))
  }

  performSearchFrogs = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiK}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => this.setState({frogsImages: responseData.photos.photo}))
      .catch(err => console.log('Error fetching data: ', err))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Nav />
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cats" render={() => <Gallery query={this.state.catsImages} title={'cats'} />} />
            <Route path="/dogs" render={() => <Gallery query={this.state.dogsImages} title={'dogs'}/>} />
            <Route path="/frogs" render={() => <Gallery query={this.state.frogsImages} title={'frogs'}/>}/>
            <Route path="/search/:query" render={({match}) => <SearchContainer searchQuery={match.params.query} />}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;