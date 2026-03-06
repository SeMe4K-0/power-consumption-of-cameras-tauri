import { type FC, useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import type { Camera } from '../../types';
import { getCamera } from '../../modules/cameras';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import defaultImage from '/src/assets/default_camera.png';
import './CamerasDetailPage.css';

export const CamerasDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [camera, setCamera] = useState<Camera | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCamera = async () => {
      if (!id) {
        setError('ID камеры не указан');
        setLoading(false);
        return;
      }

      try {
        const cameraId = parseInt(id, 10);
        if (isNaN(cameraId)) {
          setError('Неверный ID камеры');
          setLoading(false);
          return;
        }

        const data = await getCamera(cameraId);
        setCamera(data);
      } catch (err) {
        setError('Ошибка при загрузке камеры');
        console.error('Error loading camera:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCamera();
  }, [id]);

  if (loading) {
    return (
      <div className="camera-detail-page">
        <div className="loading-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
          <p>Загрузка информации о камере...</p>
        </div>
      </div>
    );
  }

  if (error || !camera) {
    return (
      <div className="camera-detail-page">
        <Alert variant="danger" className="error-alert">
          {error || 'Камера не найдена'}
        </Alert>
      </div>
    );
  }

  return (
    <div className="camera-detail-page">
      <BreadCrumbs 
        crumbs={[
          { label: ROUTE_LABELS.CAMERAS, path: ROUTES.CAMERAS },
          { label: camera.name }
        ]} 
      />
      
      <Container className="camera-detail-container">
        <h1>{camera.name}</h1>
        
        <div className="camera-card">
          <div className="camera-image-wrapper">
            <img
              src={camera.image || defaultImage}
              alt={camera.name}
              className="camera-image"
            />
          </div>
          <div className="camera-info-wrapper">
            <p className="camera-detail-power"><strong>Мощность:</strong> {camera.power} Вт</p>
            {camera.description && (
              <p className="camera-detail-description"><strong>Описание:</strong> {camera.description}</p>
            )}
          </div>
        </div>
      </Container>
      
    </div>
  );
};

