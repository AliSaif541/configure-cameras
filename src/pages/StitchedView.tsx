import { useNavigate } from 'react-router-dom';
import '../styles/StitchedView.css'

interface StitchedViewProps {
    stitchedFeed: string;
}

const StitchedView: React.FC<StitchedViewProps> = ({ stitchedFeed }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/configure-cameras')
    }
    return (
        <div className="stitched">
            <h1>Stitched View</h1>
            <div className='vid-container'>
                <video src={stitchedFeed} />
            </div>
            <button onClick={handleSubmit}>Configure Cameras</button>
        </div>
    )
}

export default StitchedView;