import { type FC } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import './HomePage.css';

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <BreadCrumbs crumbs={[]} />
      
      {/* banner removed */}
      
      <Container className="home-content">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="welcome-card">
              <Card.Body>
                <Card.Title className="welcome-title">
                  Добро пожаловать!
                </Card.Title>
                <div className="welcome-features">
                  <Carousel interval={6000} indicators={true} controls={true} fade>
                    <Carousel.Item>
                      <div className="carousel-content">
                        <h5>Возможности</h5>
                        <ul>
                          <li>Просмотр каталога камер видеонаблюдения</li>
                          <li>Фильтрация камер по названию</li>
                          <li>Детальная информация по мощности и описанию камеры</li>
                          <li>Формирование заявок на расчёт энергопотребления</li>
                        </ul>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div className="carousel-content">
                        <h5>Как использовать</h5>
                        <ol>
                          <li>Перейдите в раздел "Камеры"</li>
                          <li>Выберите интересующие вас модели</li>
                          <li>Откройте карточку камеры для подробностей</li>
                          <li>Создайте заявку на расчёт энергопотребления</li>
                        </ol>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div className="carousel-content">
                        <h5>Подсказки</h5>
                        <ul>
                          <li>Ищите по названию модели: Hikvision, Dahua, Axis…</li>
                          <li>Смотрите поле “Мощность”, чтобы оценить энергозатраты</li>
                          <li>Добавляйте камеры в расчёт прямо со страницы списка</li>
                        </ul>
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};
