import React, { Component } from 'react';
class Filter extends Component {
    state = {  }
    render() { 
        return ( 
            <ul class="list-group">
            {this.props.genres.map(genre=><li onClick={()=>this.props.onClickGenre(genre.name)} key={genre.id} className={this.props.selected_genre===genre.name ? "list-group-item active" : "list-group-item"} style={{cursor:"pointer"}}>{genre.name}</li>)}
            </ul>
         );
    }
}
 
export default Filter;