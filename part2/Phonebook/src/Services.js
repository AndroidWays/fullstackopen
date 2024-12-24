import axios from 'axios';

// Define the base URL for your API
//const baseUrl = 'http://localhost:3001/persons'; // Update this URL to your actual API endpoint
//const baseUrl = 'http://localhost:3001/api/persons'; // Integrating the frontend with the backend
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
};

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data);
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
};

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

export default { getAll, create, update, remove };
