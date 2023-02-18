import {api} from "./api"

const Test = {
    getTest:  () => {
        return api.get('/get');
    }
}

export default Test;