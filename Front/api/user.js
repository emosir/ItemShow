import request from './http';

const userUrl = request.urlPrefix + "/user"

const userApi = {
    login: (code) => {
        return request.http(`${userUrl}/login`, 'GET', {code: code});
    },
    uploadBase: (id,name,gender,description) => {
        return request.http(`${userUrl}/base`, 'POST', {id:id,name:name,gender:gender,description:description});
    }
}


export default userApi;