import request from './http';

const eventAndMessageUrl=request.urlPrefix+"/eventAndMessageUrl"

const eventAndMessageUrlApi = {
    getUserEventAndMessage:(id)=>{
        return request.http(`${eventAndMessageUrl}`,'GET',{id:id});
    },
    uploadMailBase:(eventId,state,senderId,recipientId,topic,description)=>{
        return request.http(`${eventAndMessageUrl}/mail/base`,'POST',{eventId:eventId,state:state,senderId:senderId,recipientId:recipientId,topic:topic,description:description});
    },
    applyJoinTeam:(senderId,recipientId,position)=>{
        return request.http(`${eventAndMessageUrl}/join`,'POST',{senderId:senderId,recipientId:recipientId,position:position});
    },
    getMailById:(id)=>{
        return request.http(`${eventAndMessageUrl}/mail/base`,'GET',{id:id});
    }
}


export default eventAndMessageUrlApi;
