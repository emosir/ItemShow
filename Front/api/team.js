import request from './http';

const teamUrl=request.urlPrefix+"/team"

const teamApi = {
    uploadTeamBaseInfo : (id, name, description) => {
        return request.http(`${teamUrl+"/base"}`,'POST',{id:id,name:name,description:description});
    },
    getTeamById:(id)=>{
        return request.http(`${teamUrl+"/one"}`,'GET',{id:id});
    },
    getUserLeaderTeams:(id,current)=>{
        return request.http(`${teamUrl+"/create"}`,'GET',{id:id,current:current});
    },
    getUserInvolveTeams:(id,current)=>{
        return request.http(`${teamUrl+"/involve"}`,'GET',{id:id,current:current});
    }
}


export default teamApi;
