import axios from 'axios';
import store from '../store/index'; // Подключение store для доступа к состоянию
import { refresh } from '../store/auth/authOperations';
/* import { setTokens } from '../store/auth/authSlice'; */
import { logOut } from '../store/auth/authOperations';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const setupAxiosInterceptors = () => {
  // Перехватчик запросов
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Перехватчик ответов
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log("originalRequest 1111", originalRequest);
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const token = localStorage.getItem('token');
        console.log('refreshToken from localStorage', refreshToken);
        console.log('token from localStorage', token);
        if (refreshToken) {
          try {
            // Попытка обновить токен
            const newTokens = await store.dispatch(refresh(refreshToken));

            /*  store.dispatch(setTokens(newTokens.payload));  */ // Сохраняем новые токены в Redux

            // Обновляем заголовки и повторяем запрос
            if (typeof newTokens.payload === 'object' && newTokens.payload.token) {
              api.defaults.headers['Authorization'] = `Bearer ${newTokens.payload.token}`;
              originalRequest.headers.Authorization = `Bearer ${newTokens.payload.token}`;

              console.log("originalRequest 222", originalRequest.headers.Authorization);
              return api(originalRequest); // Повторяем запрос с новым токеном
            } else {
              throw new Error('Tokens not found or invalid');
            }
          } catch (refreshError) {
            const email = store.getState().auth.user.email;
            console.log('email', email);
            console.error('Ошибка обновления токена', refreshError);
            if (email) {
              store.dispatch(logOut({ email })); // Вызываем диспатч для разлогинивания пользователя (передаем email));  // В случае ошибки обновления токена — разлогиниваем пользователя
              window.location.href = '/react_typescript_todo/signin';  // Перенаправление на страницу логина
              return Promise.reject(refreshError)
            }

          }
        }
      }
      return Promise.reject(error);
    }
  );
};


