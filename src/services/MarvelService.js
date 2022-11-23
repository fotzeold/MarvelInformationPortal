import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=3cc8cb42144fbc2d62270ab60dd9bced';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const getAllComics = async (offset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const _transformComics = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			price: comic.prices[0].price,
			thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension
		}
	}

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description ? char.description : 'There is no information about this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}

	return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics }
}

export default useMarvelService;
