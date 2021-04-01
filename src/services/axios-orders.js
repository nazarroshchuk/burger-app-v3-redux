import axios from 'axios';

export const init = axios.create({
    baseURL: 'https://burger-builder-app-7ee8b-default-rtdb.firebaseio.com/'
});


