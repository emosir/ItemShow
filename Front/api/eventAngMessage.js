import request from './http';

const eventAndMessageUrl=request.urlPrefix+"/eventAndMessageUrl"

const eventAndMessageUrlApi = {
    getUserEventAndMessage:(id)=>{
        return request.http(`${eventAndMessageUrl}`,'GET',{id:id});
    }
}


export default eventAndMessageUrlApi;
