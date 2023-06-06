import {api} from "./api"

const UserApi = {
    list: ({token, params}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.get('/api/user/list', {
            headers: headers,
            params: params
        });
    },

    create: ({token, data}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.post('/api/user/create',data, {
            headers: headers,
        });
    },
    
    edit: ({token, id ,data}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }

        if(!id) {
            throw new Error("Vui lòng nhập id");
        }

        return api.put(`/api/user/edit/${id}`,data, {
            headers: headers,
        });
    },

    getById: ({token, id}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }

        return api.get(`/api/user/${id}`, {
            headers: headers
        });
    }
    
}

export default UserApi;