import { writable } from "svelte/store";

export const commentsData = writable();
export const storiesData = writable();
export const feedbacksData = writable();

export const fetchComments = async () => {
  const response = await fetch(import.meta.env.VITE_PROTOCOL + '://' + import.meta.env.VITE_HOST + '/comment', { method: 'GET' });
  if (!response.ok) throw new Error('Network error');
  return await response.json();
};

export const fetchStories = async () => {
  const response = await fetch(import.meta.env.VITE_PROTOCOL + '://' + import.meta.env.VITE_HOST + '/story', { method: 'GET' });
  if (!response.ok) throw new Error('Network error');
  return await response.json();
};

export const fetchFeedbacks = async () => {
  const response = await fetch(import.meta.env.VITE_PROTOCOL + '://' + import.meta.env.VITE_HOST + '/feedbacks', { method: 'GET' });
  if (!response.ok) throw new Error('Network error');
  return await response.json();
};