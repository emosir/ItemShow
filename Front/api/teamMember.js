import request from './http';

const teamMemberUrl=request.urlPrefix+"/team/members"

const teamMemberApi = {
    getTeamMembers : (id) => {
        return request.http(`${teamMemberUrl}`,'GET',{id:id});
    },
    jobChange:(userId,teamId,position)=>{
        return request.http(`${teamMemberUrl}`+"/jobChange",'PATCH',{userId:userId,teamId:teamId,position:position})
    },
    removeMember:(userId,teamId)=>{
        return request.http(`${teamMemberUrl}`+"/remove",'DELETE',{userId:userId,teamId:teamId})
    },
    uploadPosition:(id,position)=>{
        return request.http(`${teamMemberUrl}`+"/position",'POST',{id:id,position:position})
    },
    uploadTheme:(id,theme)=>{
        return request.http(`${teamMemberUrl}`+"/theme",'POST',{id:id,theme})
    },
    uploadPositionNumber:(id,positionNumber)=>{
        return request.http(`${teamMemberUrl}`+"/positionNumber",'POST',{id:id,positionNumber:positionNumber})
    },
    invite:(userId,teamId)=>{
        return request.http(`${teamMemberUrl}`+"/invite",'PATCH',{userId:userId,teamId:teamId})
    }
}


export default teamMemberApi;
