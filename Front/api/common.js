import request from './http';

const commonUrl=request.urlPrefix

const commonApi = {
    likeOrDislike : (id,mode) => {
        return request.http(`${commonUrl+"/like"}`,'PATCH',{id:id,mode:mode});
    },
}


export default commonApi;
