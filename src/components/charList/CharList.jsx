import { Component } from 'react'
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

	state = {
		charList: [],
		loading: true,
		error: false,
		offset: 210,
		loadingMore: false,
		charEnded: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateCharList()
	}

	onLoadedList = (newCharList) => {
		let end = false;
		if (newCharList.length < 9) end = true;

		this.setState(({ charList, offset }) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			loadingMore: false,
			offset: offset + 9,
			charEnded: end
		}))
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	updateCharList = (offset) => {
		this.setState({ error: false })
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onLoadedList)
			.catch(this.onError)
	}

	onRequestMoreChar = (offset) => {
		this.setState({ loadingMore: true })
		this.updateCharList(offset)
	}

	renderList(charList) {
		const stucture = charList.map(elem => {
			let imgStyle = { 'objectFit': 'cover' };
			if (elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
				elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
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
		const { charList, loading, error, offset, loadingMore, charEnded } = this.state;

		const stucture = this.renderList(charList)

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? stucture : null;

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}

				{loadingMore ? <Spinner /> :
					<button
						style={charEnded ? { 'display': 'none' } : { 'display': 'block' }}
						className="button button__main button__long"
						onClick={() => this.onRequestMoreChar(offset)}>
						<div className="inner">load more</div>
					</button>
				}
			</div>
		)
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;