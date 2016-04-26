import React from 'react';
import ReactDom from 'react-dom';

export default class RestrauntMenuCategories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: props.data}
	}

	render() {
    var lists = this.state.data.map(function(category, index) {
      return (<li key={index}>
          {category}
        </li>);
    });

    return (
      <ul className="category">
        { lists }
      </ul>
    );
	}
}
