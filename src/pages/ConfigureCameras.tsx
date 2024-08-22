

import React, { useEffect, useState } from 'react';
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
    const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
    const [displayedCount, setDisplayedCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const initializeCameras = async () => {
        try {
            const cameras = await fetchCameraIndexes();
            setCameraOptions(cameras);
            setCameraAmount([...Array(cameras.length).keys()].map(i => (cameras.length - i).toString()));
            setDisplayedCount(cameras.length);
            setSelectedCameras(cameras);
        } catch (error) {
            console.error('Error initializing cameras:', error);
        }
    };

    useEffect(() => {
        initializeCameras();
    }, []);

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
                    <select onChange={(e) => setDisplayedCount(Number(e.target.value))} value={displayedCount}>
                        {cameraAmount.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                        ))}
                    </select>
                </p>
            </div>
            <div className='images-container'>
                {selectedCameras.slice(0, displayedCount).map((cameraIndex, index) => (
                    <div className={`wrapper img-${index}`} key={index}>
                        <div className="image-wrapper">
                            <img src={`http://localhost:3001/video_feed/${cameraIndex}`} alt={`Camera ${cameraIndex}`} />
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="action-button" disabled={loading}>
                {loading ? <TailSpin height="20" width="20" color="#FFFFFF" ariaLabel="loading" /> : 'Configure Cameras'}
            </button>
        </div>
    );
};

export default ConfigureCameras;
