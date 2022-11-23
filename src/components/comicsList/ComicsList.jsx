import { useState, useEffect } from 'react'

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [offset, setOffset] = useState(10);
	const [loadingMore, setLoadingMore] = useState(false);

	const { loading, error, clearError, getAllComics } = useMarvelService();

	useEffect(() => {
		onRequest(offset, false)
	}, [])

	const onLoadedComics = (data) => {
		setOffset(offset => offset + 8);
		setLoadingMore(false);
		setComicsList(comicsList => [...comicsList, ...data]);
	}

	const onRequest = (offset, init) => {
		init ? setLoadingMore(true) : setLoadingMore(false);
		clearError();
		getAllComics(offset).then(onLoadedComics)
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !loadingMore ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{spinner}
			<ul className="comics__grid">
				{
					comicsList.map((elem, i) => {
						return (
							<li key={elem.id} className="comics__item">
								<a href="">
									<img src={elem.thumbnail} alt={elem.title} className="comics__item-img" />
									<div className="comics__item-name">{elem.title}</div>
									<div className="comics__item-price">{elem.price + '$'}</div>
								</a>
							</li>
						)
					})
				}
			</ul>
			{errorMessage}
			{loadingMore && !errorMessage ? <Spinner /> :
				<button className="button button__main button__long">
					<div className="inner" onClick={() => onRequest(offset, true)}>load more</div>
				</button>
			}
		</div>
	)
}

export default ComicsList;