import './app.css'
import App from './App.svelte'

document.addEventListener('DOMContentLoaded', () => {
  document.body.dataset.theme = localStorage.getItem('theme') || 'default';
});

const app = new App({
  target: document.getElementById('app'),
})

export default app
