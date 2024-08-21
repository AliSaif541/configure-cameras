export const fetchCameraIndexes = async (): Promise<number[]> => {
    try {
      const response = await fetch('http://localhost:3001/list_cameras');
      if (!response.ok) {
        throw new Error('Failed to fetch camera indexes');
      }
      const data: number[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching camera indexes:', error);
      throw error;
    }
};
  
export const fetchVideoFeed = async (cameraIndex: number): Promise<string> => {
    try {
      const response = await fetch(`http://localhost:3001/video_feed/${cameraIndex}`);
      if (!response.ok) {
        throw new Error('Failed to fetch video feed');
      }
      const data: { videoUrl: string } = await response.json();
      return data.videoUrl;
    } catch (error) {
      console.error(`Error fetching video feed for camera ${cameraIndex}:`, error);
      throw error;
    }
};

export const handleCameraIndexes = async (indexes: number[]): Promise<string> => {
    try {
        console.log('Received indexes:', indexes);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        
        return 'https://www.w3schools.com/html/mov_bbb.mp4';
    } catch (error) {
        console.error('Error handling camera indexes:', error);
        throw error;
    }
};