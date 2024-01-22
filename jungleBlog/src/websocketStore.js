import { writable } from 'svelte/store';

export const websocket = writable(null);

export function initWebSocket(url) {
  let ws = new WebSocket(`${import.meta.env.VITE_WS_PROTOCOL}://${url}`);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected, trying to reconnect...');
    setTimeout(() => initWebSocket(url), 3000);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    ws.close();
  };

  websocket.set(ws);
}