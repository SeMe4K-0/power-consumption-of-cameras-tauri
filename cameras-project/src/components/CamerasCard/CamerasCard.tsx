import { type FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Camera } from '../../types';
import defaultImage from '/src/assets/default_camera.png';
import './CamerasCard.css';

interface CamerasCardProps {
  camera: Camera;
  onViewDetails: (id: number) => void;
}

export const CamerasCard: FC<CamerasCardProps> = ({ 
  camera, 
  onViewDetails
}) => {
  return (
    <Card className="camera-card">
      <div className="camera-image-wrapper">
        <Card.Img 
          variant="top" 
          src={camera.image || defaultImage} 
          alt={camera.name}
          className="camera-image"
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
