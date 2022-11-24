import gif404 from '../../resources/img/404.gif';
import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<div>
			<img src={gif404} style={{ display: "block", width: "550px", margin: "0 auto" }} alt="Page is not found" />
			<div
				style={{
					margin: "0 auto",
					display: "block",
					width: "220px",
					textAlign: "center",
					fontSize: "24px"
				}}
			>
				Page is <strong style={{ color: "#9F0013" }}>Not</strong> found <br /><br />
				<div className="gradient-error">
					Main page here &#10143; <Link to="/"><strong style={{ color: "#9F0013", position: "absolute", top: 0 }}>Main</strong></Link>
				</div>
			</div>
		</div>
	)
}

export default Page404;