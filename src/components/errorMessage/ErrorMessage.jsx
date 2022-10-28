import error from './error.gif'

const ErrorMessage = () => {
	return (
		<img src={error} style={{ display: 'block', width: '200px', objectFit: 'contain', height: '200px', margin: '0 auto' }} alt="Error" />
	)
}

export default ErrorMessage;