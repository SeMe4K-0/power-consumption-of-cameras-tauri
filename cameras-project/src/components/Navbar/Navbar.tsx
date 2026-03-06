import { type FC } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import './Navbar.css';

export const Navbar: FC = () => {
  const location = useLocation();

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand">
          <div className="logo-container">
            <img src="/src/assets/logo.png" alt="Logo" className="logo-image" />
          </div>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to={ROUTES.HOME}
              className={location.pathname === ROUTES.HOME ? 'active' : ''}
            >
              {ROUTE_LABELS.HOME}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to={ROUTES.CAMERAS}
              className={location.pathname === ROUTES.CAMERAS ? 'active' : ''}
            >
              {ROUTE_LABELS.CAMERAS}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
