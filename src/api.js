import axios from 'axios';
import emailjs from '@emailjs/browser';

const RECAPTCHA_SITE_KEY = '6LfcclUtAAAAAM9ISGQsZpRIqYxHxph3_6jEHAcu';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 15000,
});

export const EMAILJS_PUBLIC_KEY = 'Wmyt35neu9ZwMjtQK';
export const EMAILJS_SERVICE_ID = 'service_08i5lsh';
export const EMAILJS_ADMIN_TEMPLATE = 'template_0nu1ofs';
export const EMAILJS_USER_TEMPLATE = 'template_gwwejsd';

emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendAdminEmail = (params) =>
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE, params);

export const sendUserEmail = (params) =>
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_USER_TEMPLATE, params);

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
