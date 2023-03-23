import {api} from "./api"

const Auth = {
    // getSessionId:  () => {
    //     return api.get('/api/get-session');
    // }

    login: (data) => {
        const url = "/api/login";

        return api.post(url, data);
    },

    permission: ({token}) => {
        const url = "/api/get-permission";
        let headers = {};
        if(token){
            headers = {...headers, "Authorization": `Bearer ${token}`}
        }

        return api.get(url, {
            headers: headers
        });
    }
}

export default Auth;