import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleComicPage = (props) => {
	const { comicId } = useParams();
	const [comic, setComic] = useState({});

	const { loading, error, getComic, clearError } = useMarvelService();

	useEffect(() => {
		updateComic(comicId);
	}, [comicId])

	const onComicLoaded = (comic) => {
		setComic(comic);
	}

	const updateComic = (comicId) => {
		clearError();
		getComic(comicId).then(onComicLoaded);
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <View comic={comic} href={props.href} /> : null

	return (
		<>
			{errorMessage}
			{spinner}
			{content}
		</>
	)
}

const View = (props) => {
	const { title, description, thumbnail, id, price, pageCount } = props.comic;
	return (
		<>
			<div className="single-comic">
				<img src={thumbnail} alt={title} className="single-comic__img" />
				<div className="single-comic__info">
					<h2 className="single-comic__name">{title}</h2>
					<p className="single-comic__descr">{description ? description : 'There is no description'}</p>
					<p className="single-comic__descr">{`Number of page: ${pageCount}`}</p>
					<p className="single-comic__descr">{`Number of this comic: ${id}`}</p>
					<div className="single-comic__price">{price == 0 ? 'NOT AVAILABLE' : `Price: ${price}$`}</div>
				</div>
				<Link to={props.href} className="single-comic__back">&#5130; Back to all</Link>
			</div>
			<br />
			<AppBanner />
		</>
	)
}

export default SingleComicPage;