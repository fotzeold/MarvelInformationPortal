import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsPage = (props) => {
	return (
		<>
			<AppBanner></AppBanner>
			<ComicsList setHref={props.setHref}></ComicsList>
		</>
	)
}

export default ComicsPage;