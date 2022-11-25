import { useState, useEffect } from 'react'

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundery/ErrorBoundery';

import decoration from '../../resources/img/vision.png';

const MainPage = (props) => {
	const [selectedChar, setSelectedChar] = useState(null);

	useEffect(() => {
		props.setHref('/')
	},[])

	const onCharSelected = (id) => {
		setSelectedChar(id)
	}

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage;