# Deployment Diagram

```mermaid
flowchart LR
  Phone[Phone Browser or Installed PWA]
  DesktopBrowser[Desktop Browser]
  TauriApp[Tauri Desktop App]

  subgraph StaticHosting["GitHub Pages (Static Hosting)"]
    Frontend[React + Vite Frontend]
    SW[Service Worker (PWA)]
  end

  subgraph LocalPC["Developer PC in local network / ZeroTier"]
    Proxy[HTTPS Frontend Proxy :3000]
    ApiService[REST API Service :8080]
    ImgService[Image Service :9000]
    DB[(Database)]
  end

  Phone -- "HTTPS" --> Frontend
  Phone -- "PWA cache API" --> SW
  DesktopBrowser -- "HTTPS" --> Frontend

  TauriApp -- "HTTPS (IP in config)" --> Proxy
  Frontend -- "HTTPS /api" --> Proxy
  Frontend -- "HTTPS /img-proxy" --> Proxy

  Proxy -- "HTTP /api/*" --> ApiService
  Proxy -- "HTTP image requests" --> ImgService
  ApiService -- "SQL" --> DB
```

## API Boundaries

- Frontend to API: `/api/cameras`, `/api/cameras/:id`, `/api/request_cameras_calculations/cart`
- Frontend to Image service: `/img-proxy/*`
- Tauri uses same frontend routes and backend API through configured LAN IP.
