import { Link } from 'react-router-dom';
import '../styles/Home.css'

const Home = () => {
    return (
        <div className='Home'>
            <Link to="/stitched-view"><button>Stitched View</button></Link>
            <Link to="/configure-cameras"><button>Configure Cameras</button></Link>
        </div>
    );
}

export default Home;