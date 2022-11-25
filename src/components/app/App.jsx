import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages"

const App = () => {
	const [href, setHref] = useState('/');

	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<MainPage setHref={setHref} />} />
						<Route path="/comics" element={<ComicsPage setHref={setHref} />} />
						<Route path="/comics/:comicId" element={<SingleComicPage href={href} />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</main>
			</div>
		</Router>

	)
}

export default App;