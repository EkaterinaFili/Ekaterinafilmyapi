const axios = require('axios');

const baseUrl = 'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production';

class ClientApi {
    async get(path) {
        let response;

        try{
            response = await axios.get(baseUrl + path);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }

    async post(path, body) {
        let response;

        try{
            response = await axios.post(baseUrl + path, body);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }

    async put(path, body) {
        let response;

        try{
            response = await axios.put(baseUrl + path, body);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }

    async delete(path) {
        let response;

        try{
            response = await axios.delete(baseUrl + path);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }
};
module.exports = ClientApi;