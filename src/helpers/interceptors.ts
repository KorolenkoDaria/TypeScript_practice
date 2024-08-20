import axios from 'axios';
/* import { refresh } from './store/auth/authOperations';
import { setTokens } from './store/auth/authSlice';  */// Action для установки новых токенов

const api = axios.create({
  baseURL: "http://localhost:5000", // Ваш базовый URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Перехватчик ответов
/* api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const newTokens = await store.dispatch(refresh(refreshToken));
          store.dispatch(setTokens(newTokens.payload)); // Обновляем токены в хранилище и localStorage

          // Повторяем оригинальный запрос с новым токеном
          api.defaults.headers.common['Authorization'] = `Bearer ${newTokens.payload.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // Обработка ошибок обновления токена (например, перенаправление на страницу входа)
        store.dispatch(logOut()); // Если refresh token также недействителен
        window.location.href = '/login'; // Перенаправление на страницу логина
      }
    }
    return Promise.reject(error);
  }
); */

export default api;
