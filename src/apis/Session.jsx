import {api} from "./api"

const Session = {
    getSessionId:  () => {
        return api.get('/api/get-session');
    }
}

export default Session;