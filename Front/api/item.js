import request from './http';

const itemUrl=request.urlPrefix+"/item"

const itemApi = {
    getNewOrHotItems : (kind) => {
        return request.http(`${itemUrl+"/newOrHot"}`,'GET',{kind:kind});
    },
    getTeamItems : (id) => {
        return request.http(`${itemUrl+"/belongTeam"}`,'GET',{id:id});
    },
    uploadItemBaseInfo : (id,name,description) => {
        return request.http(`${itemUrl+"/base"}`,'POST',{id:id,name:name,description:description});
    }
}


export default itemApi;
