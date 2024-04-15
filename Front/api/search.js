import request from './http';

const searchUrl=request.urlPrefix+"/search"


const searchApi = {
    searchForShows:(input, current, kind)=>{
        return request.http(`${searchUrl}`,'GET',{input:input,kind:kind,current:current});
    }
}


export default searchApi;
