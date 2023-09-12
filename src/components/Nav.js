import React, { useState } from 'react'
import Table from './Table'
import Customers from './customers.json'
function Nav() {
  const [searchValue,setSearchvalue]=useState("")
  const[navData,setNavdata]=useState(Customers)
  // console.log("navdata:"+navData)
  let updateData=[...navData]
  let s=''
  
  const search=(e)=>
  {
     s=e.target.value
      
  }

  const btnClick=()=>
  {
    let flag=1
    setSearchvalue(s)   
    navData.map(item=>
      {
        if(item.first_name===searchValue)
        {
          flag=0
          updateData=navData.filter(value=>value.first_name===searchValue)
        }
      
      })
      if(flag==1)
      {
        alert("Not found")
      }
        setNavdata(updateData)
  }
  console.log(navData);
   
  return (
    <div>
       <nav className="navbar fixed-top navbar-light bg-light" >
  <div className="container-fluid">
    <a className="navbar-brand"><h3>Employee Data</h3></a>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={search}></input>
      <button className="btn btn-outline-success" type="submit" onClick={()=>btnClick()}>Search</button>
    </form>
  </div>
</nav>
<Table searchVal ={searchValue}/>
    </div>
  )
}
export default Nav;