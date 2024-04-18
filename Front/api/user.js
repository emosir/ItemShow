import request from './http';

const userUrl=request.urlPrefix+"/user"

const userApi = {
    login  :  (code) => {
        return request.http(`${userUrl}/login`,'GET', {code:code});
    }
}


export default userApi;