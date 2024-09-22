import { Component } from 'react';

export default class SearchFilm extends Component {


	render() {
		const {val, onLabelChange} = this.props
		return (
			<form>
				<input className="" placeholder="Type to search..." autoFocus onChange={onLabelChange}/>
			</form>
		);
	}
}
