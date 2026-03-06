import { type FC, useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Camera, FilterParams, CamerasCartInfo } from '../../types';
import { getCameras } from '../../modules/cameras';
import * as CamerasCart from '../../modules/camerascart';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { CamerasCard } from '../../components/CamerasCard/CamerasCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCameraQuery, setCameraQuery } from '../../store/filterSlice';
import './CamerasPage.css';

export const CamerasPage: FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [camerascartInfo, setCamerascartInfo] = useState<CamerasCartInfo>({ draft_id: 0, cameras_cnt: 0 });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const storedCameraQuery = useAppSelector(selectCameraQuery);
  const urlCameraQuery = (searchParams.get('camera') || '').trim();
  const effectiveQuery = urlCameraQuery || storedCameraQuery;

  useEffect(() => {
    const loadCameras = async (filters?: FilterParams) => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getCameras(filters);
        setCameras(data);
      } catch (err) {
        setError('Ошибка при загрузке камер');
        console.error('Error loading cameras:', err);
      } finally {
        setLoading(false);
      }
    };

    const loadCamerascartInfo = async () => {
      try {
        const camerascartData = await CamerasCart.getCamerasCartInfo();
        setCamerascartInfo(camerascartData);
      } catch (err) {
        console.error('Error loading camerascart info:', err);
      }
    };

    if (!urlCameraQuery && storedCameraQuery) {
      setSearchParams({ camera: storedCameraQuery }, { replace: true });
      return;
    }

    if (urlCameraQuery !== storedCameraQuery) {
      dispatch(setCameraQuery(urlCameraQuery));
    }

    if (effectiveQuery) {
      loadCameras({ camera: effectiveQuery });
    } else {
      loadCameras();
    }
    
    loadCamerascartInfo();
  }, [dispatch, effectiveQuery, setSearchParams, storedCameraQuery, urlCameraQuery]);

  const handleViewDetails = (id: number) => {
    navigate(`${ROUTES.CAMERAS}/${id}`);
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    dispatch(setCameraQuery(trimmedQuery));

    if (trimmedQuery) {
      setSearchParams({ camera: trimmedQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="cameras-page">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CAMERAS }]} />
      
      {/* banner removed */}

      <SearchBar 
        onSearch={handleSearch}
        placeholder="Найти..."
        initialValue={effectiveQuery}
      />

      <Container className="space">
        {loading && (
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
            <p>Загрузка камер...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="error-alert">
            {error}
          </Alert>
        )}

        {!loading && !error && cameras.length === 0 && (
          <div className="no-results">
            <h3>Камеры не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {!loading && !error && cameras.length > 0 && (
          <div className="cameras-grid">
            {cameras.map((cameraItem) => (
              <div key={cameraItem.id} className="camera-col">
                <CamerasCard
                  camera={cameraItem}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        )}
      </Container>

      <div className={`camerascart-icon-container ${camerascartInfo.draft_id === 0 && camerascartInfo.cameras_cnt === 0 ? 'disabled' : ''}`}>
        <img src="/src/assets/camerascart_icon.png" alt="Camerascart" className="camerascart-icon" />
        {camerascartInfo.cameras_cnt > 0 && (
          <span className="camerascart-count">{camerascartInfo.cameras_cnt}</span>
        )}
      </div>

    </div>
  );
};

