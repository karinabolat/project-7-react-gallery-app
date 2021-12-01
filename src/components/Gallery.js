import React from 'react';

// Import components
import Photo from './Photo';
import NoResults from './NoResults';

// Component to iterate through array of images
const Gallery = (props) => {
    const results = props.query;
    let images;

    if (results.length > 0) {
        images = results.map(image => {
            return (
                <Photo
                    url={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                    key={image.id}
                    alt={props.title}
                />
            );
        });
    } else {
        images = <NoResults />
    }

    return(
        <div className="photo-container">
            <h2>{props.title}</h2>
            <ul>
                {images}
            </ul>
        </div>
    )
}

export default Gallery;

