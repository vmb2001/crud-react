import React, { useEffect } from 'react'

function Test() {

useEffect(() =>{
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => console.log(response))
    }, [])
    
  return (
    <div>
        
    </div>
  )
}
export default Test
