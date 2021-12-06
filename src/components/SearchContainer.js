import React, {Component} from 'react';
import Gallery from './Gallery';

import apiKey from './config.js';

// saving API key value in a variable
const apiK = apiKey;

// Component to perfrom search
class SearchContainer extends Component {

    constructor() {
        super();
        this.state = {
        searchedImages: [], 
        isLoading: true, 
        searchValue: ''}
    }

    performSearch = (query) => {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiK}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
          .then(response => response.json())
          .then(responseData => this.setState({searchedImages: responseData.photos.photo, isLoading: false, searchValue: query}))
          .catch(err => console.log('Error fetching data: ', err));
    }

    componentDidMount() {
        this.performSearch(this.props.searchQuery);        
    }

    componentDidUpdate(prevProps) {
        let newValue = this.props.searchQuery;
        if (prevProps.searchQuery !== newValue) {
            this.performSearch(newValue);
        }
    }

    render() {
        return (
            this.state.isLoading? <p>Loading...</p> : <Gallery query={this.state.searchedImages} title={this.state.searchValue} />
        );
    }
}

export default SearchContainer;