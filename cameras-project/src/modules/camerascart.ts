import type { CamerasCartInfo } from '../types';

export const getCamerasCartInfo = async (): Promise<CamerasCartInfo> => {
  try {
    const response = await fetch(`/api/request_cameras_calculations/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API request failed, using default camerascart info:', error);
    return {
      draft_id: 0,
      cameras_cnt: 0,
    };
  }
};
