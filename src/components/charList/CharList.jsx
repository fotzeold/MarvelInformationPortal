import { useState, useEffect, useRef, React } from 'react'
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

	const [charList, setCharList] = useState([]),
		[offset, setOffset] = useState(Math.round(Math.random() * (500 - 210) + 210)),
		[loadingMore, setLoadingMore] = useState(false),
		[charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		updateCharList(offset, true)
	}, [])

	const onLoadedList = (newCharList) => {
		let end = false;
		if (newCharList.length < 9) end = true;

		setCharList(charList => [...charList, ...newCharList]);
		setLoadingMore(false);
		setOffset(offset => offset + 9);
		setCharEnded(end);
	}

	const updateCharList = (offset, init = false) => {
		init ? setLoadingMore(false) : setLoadingMore(true)
		getAllCharacters(offset).then(onLoadedList)
	}

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	function renderList(charList) {
		const stucture = charList.map((elem, i) => {
			let imgStyle = { 'objectFit': 'cover' };
			if (elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
				elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
				imgStyle = { 'objectFit': 'unset' };
			}
			return (
				<li
					className="char__item"
					tabIndex={0}
					key={elem.id}
					ref={el => itemRefs.current[i] = el}
					onClick={() => {
						props.onCharSelected(elem.id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === "Enter") {
							props.onCharSelected(elem.id);
							focusOnItem(i);
						}
					}}
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

	const stucture = renderList(charList)
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !loadingMore ? <Spinner /> : null;

	return (
		<div className="char__list">
			{spinner}
			{stucture}
			{errorMessage}
			{loadingMore ? <Spinner /> :
				<button
					style={charEnded ? { 'display': 'none' } : { 'display': 'block' }}
					className="button button__main button__long"
					onClick={() => updateCharList(offset)}>
					<div className="inner">load more</div>
				</button>
			}
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;