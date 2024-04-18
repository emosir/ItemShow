import request from './http';

const teamUrl=request.urlPrefix+"/team"

const teamApi = {
    uploadTeamBaseInfo : (id, name, description) => {
        return request.http(`${teamUrl+"/base"}`,'POST',{id:id,name:name,description:description});
    }
}


export default teamApi;
