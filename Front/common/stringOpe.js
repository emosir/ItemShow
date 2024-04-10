

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
    }

}


export default stringOpe;