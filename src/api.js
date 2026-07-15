import axios from 'axios';

const RECAPTCHA_SITE_KEY = '6LfcclUtAAAAAM9ISGQsZpRIqYxHxph3_6jEHAcu';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 15000,
});

export const getRecaptchaToken = (action) => {
  return new Promise((resolve) => {
    if (!window.grecaptcha) {
      resolve(null);
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(() => resolve(null));
    });
  });
};

export default api;
