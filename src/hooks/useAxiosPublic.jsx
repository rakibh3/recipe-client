import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://task--recipe-ac13aaec96a1.herokuapp.com',
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
