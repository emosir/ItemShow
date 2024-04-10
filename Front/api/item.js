import request from './http';

const itemUrl=request.urlPrefix+"/item"

const itemApi = {
    getNewOrHotItems : (kind,current) => {
        // return request.http(`${itemUrl+"/newOrHot"}`,'GET',{kind:kind,current:current});
        return request.http('http://172.21.176.1:10393/mock/4817aa85-a9cc-4153-b774-98cccfa1ffee/itemShow/item/newOrHot?apipost_id=305579','GET');
    },

    getTeamItems : (id,current) => {
        return request.http(`${itemUrl+"/belongTeam"}`,'GET',{id:id,current:current});
    },
    uploadItemBaseInfo : (id,name,description) => {
        return request.http(`${itemUrl+"/base"}`,'POST',{id:id,name:name,description:description});
    }
}


export default itemApi;
