// utils/auth.ts
import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('OTP');
};

export const isAuthenticated = () => {
    console.log(getToken())
  return !!getToken();
};
