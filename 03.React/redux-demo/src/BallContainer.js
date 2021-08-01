import React from 'react'
import {buyBall} from './redux/balls/BallActions';
import { connect } from 'react-redux'

/* import {useSelector,useDispatch} from "react-redux" 
    const myState = useSelector((state)=>state.ball.numofBalls);
    const dispatch = useDispatch();
    <button onClick={dispatch(buyBall)}>Buy Balls</button> 
*/

// props me mapStateToProps k return items ajaenge (numOfBalls,buyBall)
function BallContainer(props) {
    console.log('ball render');
    return (
        <div>
            <h2>Number of Balls- {props.numofBalls}</h2>
            <button onClick={props.buyBall}>Buy Balls</button>
        </div>
    )
}
// read from store
// mapStateToProps -> recieves global state
const mapStateToProps = state =>{
    return{
        numofBalls: state.ball.numofBalls
    }
}

// dispatch deta h  
const mapDispatchToProps = dispatch=>{
    return{
        buyBall: ()=>dispatch(buyBall())
    }
}

// wrap methods in order to tell they are redux methods
// connect will (map methods) output ko ballcontainer ko dedega
// connect se arg state ki info mil jati map methods ko
export default connect(mapStateToProps,mapDispatchToProps)(BallContainer)