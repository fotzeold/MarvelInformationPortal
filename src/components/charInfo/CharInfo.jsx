import { useState, useEffect } from 'react'
import './charInfo.scss';

import Sceleton from '../skeleton/Sceleton'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar()
	}, [props.charId])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = () => {
		const { charId } = props;
		if (!charId) return;

		clearError();

		getCharacter(charId)
			.then(onCharLoaded)
	}

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

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
		thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
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