import {api} from "./api"

const PermissonApi = {
    listAdmin:  ({token,params}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.get('/api/permission/list-admin', {
            headers: headers,
            params: params
        });
    },
    add: ({token, data}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.post('/api/permission/add',data, {
            headers: headers,
        });
    },
    listPermissionByRole: ({token, params}) => {
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }
        return api.get('/api/permission/list-permission-by-role', {
            headers: headers,
            params: params
        });
    }
}

export default PermissonApi;