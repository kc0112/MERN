// obj -> {type,payload}

// action creator -> returns obj

const BUY_BALL = 'BUY_BALL';
// if i need tto make a change i can do it here and it will get reflected everywhere
export const buyBall = ()=>{
    return {
        type:BUY_BALL
    }
}