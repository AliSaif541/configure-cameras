import { useEffect, useState } from 'react';
import { fetchCameraIndexes, fetchVideoFeed, handleCameraIndexes } from '../services/api';
import '../styles/ConfigureCameras.css';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

interface ConfigureCamerasProps {
    setStitchedFeed: (url: string) => void;
}

const ConfigureCameras: React.FC<ConfigureCamerasProps> = ({ setStitchedFeed }) => {
    const [cameraOptions, setCameraOptions] = useState<number[]>([]);
    const [cameraAmount, setCameraAmount] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
    const [displayedCount, setDisplayedCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);  // Loading state
    const navigate = useNavigate();

    const initializeCameras = async () => {
        try {
            const cameras = await fetchCameraIndexes();
            setCameraOptions(cameras);
            
            const cameraCount = cameras.length;
            setCameraAmount([...Array(cameraCount).keys()].map(i => (cameraCount - i).toString()));

            const initialDisplayedCount = cameras.length;
            setDisplayedCount(initialDisplayedCount);

            const videoUrls = await Promise.all(cameras.map(index => fetchVideoFeed(index)));
            setImages(videoUrls);
            setSelectedCameras(cameras);

        } catch (error) {
            console.error('Error initializing cameras:', error);
        }
    };

    const updateVideos = async () => {
        try {
            const videoUrls = await Promise.all(selectedCameras.slice(0, displayedCount).map(index => fetchVideoFeed(index)));
            setImages(videoUrls);
        } catch (error) {
            console.error('Error fetching video feeds:', error);
        }
    };

    useEffect(() => {
        initializeCameras();
    }, []);

    useEffect(() => {
        updateVideos();
    }, [displayedCount, selectedCameras]);

    const handleTopDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCount = Number(e.target.value);
        setDisplayedCount(newCount);
    };

    const handleCameraChange = async (index: number, cameraIndex: number) => {
        try {
            const videoUrl = await fetchVideoFeed(cameraIndex);
            setImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = videoUrl;
                return newImages;
            });
            setSelectedCameras(prevSelectedCameras => {
                const newSelectedCameras = [...prevSelectedCameras];
                newSelectedCameras[index] = cameraIndex;
                return newSelectedCameras;
            });
        } catch (error) {
            console.error('Error fetching video feed:', error);
        }
    };

    const handleSubmit = async () => {
        setLoading(true); 
        try {
            const displayedIndexes = selectedCameras.slice(0, displayedCount);
            const url = await handleCameraIndexes(displayedIndexes);
            setStitchedFeed(url);
            navigate('/stitched-view');
        } catch (error) {
            console.error('Error submitting displayed indexes:', error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className='configure'>
            <div className='Heading'>
                <h1>Configure Cameras</h1>
                <p>Select how many cameras you want: 
                    <span>{` `}</span>
                    <span className='number-dropdown'>
                        <select onChange={handleTopDropdownChange} value={displayedCount}>
                            {cameraAmount.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    </span>
                </p>
            </div>
            <div className='images-container'>
                {images.slice(0, displayedCount).map((videoUrl, index) => (
                    <div className={`wrapper img-${index}`} key={index}>
                        <div className='dropdown'>
                            <select
                                value={selectedCameras[index] || ''}
                                onChange={(e) => handleCameraChange(index, Number(e.target.value))}
                            >
                                {cameraOptions.map((option) => (
                                    <option key={option} value={option}>{`Camera ${option}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="image-wrapper">
                            <video src={videoUrl} autoPlay />
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="action-button" disabled={loading}>
                {loading ? (
                    <span className="loader">
                        <TailSpin
                        height="20"
                        width="20"
                        color="#FFFFFF"
                        ariaLabel="loading"
                        />
                    </span>
                ) : (
                    'Configure Cameras'
                )}
            </button>
        </div>
    );
};

export default ConfigureCameras;


