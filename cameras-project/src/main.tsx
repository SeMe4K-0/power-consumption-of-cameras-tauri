import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { registerSW } from 'virtual:pwa-register'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { store } from './store/store'

const isGithubPages = window.location.hostname.endsWith('github.io')
const Router = isGithubPages ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)

if ("serviceWorker" in navigator) {
  registerSW()
}
