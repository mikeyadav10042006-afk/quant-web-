import axios from 'axios';
import emailjs from '@emailjs/browser';

const RECAPTCHA_SITE_KEY = '6LfcclUtAAAAAM9ISGQsZpRIqYxHxph3_6jEHAcu';
const PROD_BACKEND = 'https://quantionic-backend.onrender.com';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? PROD_BACKEND : ''),
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

let recaptchaLoading = false;
let recaptchaLoaded = false;

function loadRecaptchaScript() {
  return new Promise((resolve) => {
    if (recaptchaLoaded || window.grecaptcha) {
      recaptchaLoaded = true;
      resolve(true);
      return;
    }
    if (recaptchaLoading) {
      const check = setInterval(() => {
        if (recaptchaLoaded || window.grecaptcha) {
          clearInterval(check);
          recaptchaLoaded = true;
          resolve(true);
        }
      }, 100);
      setTimeout(() => { clearInterval(check); resolve(false); }, 8000);
      return;
    }
    recaptchaLoading = true;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          recaptchaLoaded = true;
          resolve(true);
        });
      } else {
        resolve(false);
      }
    };
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
    setTimeout(() => { if (!recaptchaLoaded) resolve(false); }, 8000);
  });
}

export const getRecaptchaToken = async (action) => {
  try {
    if (window.grecaptcha && recaptchaLoaded) {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    }
    const loaded = await loadRecaptchaScript();
    if (!loaded || !window.grecaptcha) return null;
    return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch {
    return null;
  }
};

export default api;
