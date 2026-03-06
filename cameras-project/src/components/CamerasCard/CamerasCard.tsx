import { type FC, useMemo } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Camera } from '../../types';
import defaultImage from '../../assets/default_camera.png';
import './CamerasCard.css';

interface CamerasCardProps {
  camera: Camera;
  onViewDetails: (id: number) => void;
}

export const CamerasCard: FC<CamerasCardProps> = ({ 
  camera, 
  onViewDetails
}) => {
  const imageSrc = useMemo(() => {
    return camera.image && camera.image.trim() ? camera.image : defaultImage;
  }, [camera.image]);

  return (
    <Card className="camera-card">
      <div className="camera-image-wrapper">
        <Card.Img 
          variant="top" 
          src={imageSrc}
          alt={camera.name}
          className="camera-image"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = defaultImage;
          }}
        />
      </div>
      <div className="camera-right">
        <Card.Body className="camera-info">
          <Card.Title className="camera-title">{camera.name}</Card.Title>
          <Card.Text className="camera-power">
            Мощность: {camera.power} Вт
          </Card.Text>
        </Card.Body>
        <div className="camera-actions">
          <Button 
            className="action-button"
            onClick={() => onViewDetails(camera.id)}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
};
