

const stringOpe = {
    checkId: (id) => {
        if (id.startsWith('user')) {
            return 0;
        } else if (id.startsWith('item')) {
            return 1;
        } else if (id.startsWith('team')) {
            return 2;
        } else {
            return -1;
        }
    },
    isUserItemTeamId:(id)=>{
        return id.startsWith('user')||id.startsWith('item')||id.startsWith('team');
    }
}


export default stringOpe;