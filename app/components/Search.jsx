import React from 'react';

class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSearch(e) {
		e.preventDefault();
		
		let keyWord = this.refs.key_word.value;
		console.log('keyWord:', keyWord);
		this.props.searchCallback(keyWord);
	}

	render() {
		return <div className="search">

            <span className="divider"></span>

                <form className="" onSubmit={this.handleSearch.bind(this)}>
                    <div className="input-group">
                        <input type="text" className="form-control" ref="key_word"/>
                        <span className="input-group-addon" onClick={this.handleSearch.bind(this)}>
						Search
					</span>
                    </div>
                </form>

		</div>;
	}	
}

Search.propTypes = {
	searchCallback: React.PropTypes.func
};

Search.defaultProps = {
	searchCallback: () => {}
};

export default Search;