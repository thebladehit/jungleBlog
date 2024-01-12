import './app.css'
import App from './App.svelte'
import { initWebSocket } from './websocketStore.js';

const url = import.meta.env.VITE_SERVER_URL;
initWebSocket(url);

document.addEventListener('DOMContentLoaded', () => {
  document.body.dataset.theme = localStorage.getItem('theme') || 'default';
});

const app = new App({
  target: document.getElementById('app'),
})

export default app
