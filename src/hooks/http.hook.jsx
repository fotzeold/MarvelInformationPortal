import { useState, useCallback } from 'react';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(
		async (
			url,
			method = 'GET',
			body = null,
			headers = { 'Content-Type': 'application/json' }
		) => {
			setLoading(true);

			try {
				clearError();
				const response = await fetch(url, { method, body, headers });

				if (!response.ok) throw new Error(response.status);
				setLoading(false);

				const data = await response.json();
				return data;
			}

			catch (error) {
				setLoading(false);
				setError(error.message);
				throw error;
			}

		}, []
	)

	const clearError = useCallback(() => setError(null), []);

	return { loading, request, error, clearError }
}