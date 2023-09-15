import React, { useEffect } from 'react'
import TestTable from './TestTable'

function Test() {
const data=""
useEffect(() =>{
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => data=response.json())
    .catch(console.error())
    }, [])
    console.log(data)
  return (
    <div>
        <TestTable Ndata={data}/>
    </div>
  )
}
export default Test
