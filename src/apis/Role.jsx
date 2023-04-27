import {api} from "./api"

const RoleApi = {
    listAdmin:  ({token,params}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.get('/api/role/list-admin', {
            headers: headers,
            params: params
        });
    },
    addRole: ({token, data}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.post('/api/role/add',data, {
            headers: headers,
        });
    }
}

export default RoleApi;