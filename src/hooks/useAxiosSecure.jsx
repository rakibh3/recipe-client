import { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = Axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Add a request interceptor to axiosSecure for secure api calls
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('accessToken');
      console.log('axiosSecure', token);

      config.headers.authorization = token;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Interceptor for handling the response 401 and 403
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log('axiosSecure', status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate('/');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
export default useAxiosSecure;
