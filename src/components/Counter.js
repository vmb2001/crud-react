import React, { useState } from 'react'

function Counter() 
{
    const [count,setCount]=useState(0)
    const inc=()=>
    {
        setCount(count+1)
    }
    function dec()
    {
        setCount(count-1)
    }
   
  return (
    <div>
        <h1>Count={count}</h1>
        <button className="btn btn-success" onClick={inc}>Increment</button>
        <button className="btn btn-danger"onClick={dec}>Decrement</button>
    </div>
  )
}
export default Counter