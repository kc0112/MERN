//              useState = hook for adding state
import React, { useState } from 'react'

function Counter() {
    // hooks srf fn k andr call hte
    //     state, setstate           (initial value)
    const [count, setCount] = useState(0);
    // const lgao kyuki yha this se bind ni hta to khudke variables bnane hte
    const handleInc = () => {
        setCount(count + 1);
    }
    const handleDec = () => {
        setCount(count - 1);
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleInc}>+</button>
            <button onClick={handleDec}>-</button>
        </div>
    )
}

export default Counter
