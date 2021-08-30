import React, { Component } from 'react';
class Filter extends Component {
    state = {  }
    render() { 
        return ( 
            <ul class="list-group">
            {this.props.genres.map(genre=><li class="list-group-item">{genre}</li>)}
            </ul>
         );
    }
}
 
export default Filter;