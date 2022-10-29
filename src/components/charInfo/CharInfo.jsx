import { Component } from 'react'
import './charInfo.scss';

import Sceleton from '../skeleton/Sceleton'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
class CharInfo extends Component {

	state = {
		char: null,
		loading: false,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();

	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) return;

		this.setState({ loading: true, error: false })
		this.marvelService
			.getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	render() {
		const { char, loading, error } = this.state;

		const sceleton = char || loading || error ? null : <Sceleton />
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null

		return (
			<div className="char__info">
				{sceleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name.length < 17 ? name : name.slice(0, 15) + '...'}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<ListComics char={char} />
		</>
	)
}

const ListComics = ({ char }) => {
	const { comics } = char;

	if (comics.length == 0) return (<><div className="char__comics">Comics are not defined</div></>)

	return (
		<>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{
					comics.slice(0, 14).map((elem, index) => {
						return (
							<li key={index} className="char__comics-item">
								{elem.name}
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

export default CharInfo;