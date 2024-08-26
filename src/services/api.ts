export const fetchCameraIndexes = async (): Promise<number[]> => {
    try {
      const response = await fetch('http://localhost:3001/list-cameras');
      console.log('response:', response);
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
export const reinitializeCameras = async (): Promise<string> => {
  try {
      const response = await fetch('http://localhost:3001/reinitialize-cameras', {
          method: 'POST'
      });
      if (!response.ok) {
          throw new Error('Failed to reinitialize cameras');
      }
      const data = await response.json();
      return data.message;
  } catch (error) {
      console.error('Error reinitializing cameras:', error);
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
      
      const leftIndex = indexes[0];
      const rightIndex = indexes[1];
      
      return `http://localhost:3001/stitched_feed/${leftIndex}/${rightIndex}/`;
  } catch (error) {
      console.error('Error handling camera indexes:', error);
      throw error;
  }
};