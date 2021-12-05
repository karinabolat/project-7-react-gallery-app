import React, {Component} from 'react';
import Gallery from './Gallery';

class Container extends Component {

    state = {searchedImages: [], isLoading: true}

    performSearch = (query) => {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9843ea74d7cf2598f736313c0b64b832&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
          .then(response => response.json())
          .then(responseData => this.setState({searchedImages: responseData.photos.photo, isLoading: false}))
          .catch(err => console.log('Error fetching data: ', err));
    }
    
    render() {
        // I dont know how to call performSearch() function. If I call it here, i.e. within render(), app acts weird and keeps rendering and loggin out.
        // this.performSearch(this.props.searchQuery);
        // console.log(this.props.searchQuery);
        return (
            this.state.isLoading? <p>Loading...</p> : <Gallery query={this.state.searchedImages} title={this.props.searchQuery} />
        );
    }
}

export default Container;