import type { Camera, FilterParams } from '../types';
import { CAMERAS_MOCK } from '../data/mock';

export const getCameras = async (filters?: FilterParams): Promise<Camera[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters?.camera) {
      params.append('camera', filters.camera);
    }
    
    const queryString = params.toString();
    const url = `/api/cameras${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    
    let filteredCameras = [...CAMERAS_MOCK];
    
    if (filters?.camera) {
      filteredCameras = filteredCameras.filter(cameraItem =>
        cameraItem.name.toLowerCase().includes(filters.camera!.toLowerCase())
      );
    }
    
    return filteredCameras;
  }
};

export const getCamera = async (id: number): Promise<Camera> => {
  try {
    const response = await fetch(`/api/cameras/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    
    const cameraItem = CAMERAS_MOCK.find(p => p.id === id);
    if (!cameraItem) {
      throw new Error('Camera not found');
    }
    
    return cameraItem;
  }
};

