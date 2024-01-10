import { writable } from "svelte/store";

export const commentsData = writable();

export const fetchComments = async () => {
  const response = await fetch('http://' + import.meta.env.VITE_HOST + '/comment', { method: 'GET' });
  if (!response.ok) throw new Error('Network error');
  return await response.json();
};
