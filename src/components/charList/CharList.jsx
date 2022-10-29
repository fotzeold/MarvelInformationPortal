import { Component } from 'react'

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

	state = {
		charList: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateCharList()
	}

	onLoadedList = (charList) => {
		this.setState({ charList, loading: false })
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	updateCharList = () => {
		this.setState({ loading: true, error: false })
		this.marvelService
			.getAllCharacters()
			.then(this.onLoadedList)
			.catch(this.onError)
	}

	renderList(charList) {
		const stucture = charList.map(elem => {
			let imgStyle = { 'objectFit': 'cover' };
			if (elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}
			return (
				<li
					className="char__item"
					key={elem.id}
					onClick={() => this.props.onCharSelected(elem.id)}
				>
					<img src={elem.thumbnail} alt={elem.name} style={imgStyle} />
					<div className="char__name">{elem.name}</div>
				</li>
			)
		})
		return (
			<ul className="char__grid">
				{stucture}
			</ul>
		);
	}

	render() {
		const { charList, loading, error } = this.state;

		const stucture = this.renderList(charList)

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? stucture : null

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;