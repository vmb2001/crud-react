import React, { useEffect, useState } from 'react'
import './Table.css'
import Swal from 'sweetalert2'


function Table({data}) {

    const [updateData,setUpdatedata]=useState(data)
    const [Data,setData]=useState(data)
    const [searchValue,setSearchvalue]=useState("")

    const [currentPage,setcurrentPage]=useState(1)
    const recordPerPage=6
    const lastIndex=currentPage*recordPerPage
    const firstIndex=lastIndex-recordPerPage
    const records=Data.slice(firstIndex,lastIndex)
    const npage=Math.ceil(Data.length/recordPerPage)
    const num =[]
    const maxVpages=5
    const halfMax=Math.floor(maxVpages/2)
    const startPage=Math.max(1,currentPage-halfMax)
    const endPage=Math.min(npage,startPage+maxVpages-1)
    for(let i=startPage;i<=endPage;i++)
    {
        num.push(i)
    }

    const getSearchvalue=(e)=>
    {
      const s=e.target.value  
       console.log("search:"+s)
       if(s=="")
       {
            // console.log("INSIDE EMPTY SEARCH")
            // updateData.map(item=>console.log(item.id))
            setData(updateData)
            setSearchvalue("")
            // console.log("Searchvalue:"+searchValue)
        }
        else
        setSearchvalue(s)   
    }
  
    const handleSearch=()=>
    {
      let flag=0
      if(searchValue!="")
      {
           const searchData=Data.filter(value=>
            {
                if(value.first_name.includes(searchValue))
                {
                    flag=1
                    return true
                }
                else
                    return false
                
            })    
        if(flag==0)
        {
          alert("Not Found")
        }
        else
          setData(searchData)
    }}

    const del=(id)=>
    {
        const update=Data.filter(item=>(item.id!=id))
        setUpdatedata(update)
        // console.log("INSIDE DELETE")
        // updateData.map(item=>console.log(item.id))
        setData(update)
    }

    const update = (id) => {
        Data.map((item) => {
          if (item.id === id) {
            console.log("INSIDE")
            const { value: formValues } = Swal.fire({
              title: 'Edit Employee Details',
              html:
                `<input label="email" id="swal-input1" value=${item.email} class="swal2-input">` +
                `<input id="swal-input2" value=${item.first_name} class="swal2-input">` +
                `<input id="swal-input3" value=${item.last_name} class="swal2-input">` +
                `<input id="swal-input4" value=${item.ip} class="swal2-input">` +
                `<input id="swal-input5" value=${item.latitude} class="swal2-input">` +
                `<input id="swal-input6" value=${item.longitude} class="swal2-input">`,
      
              showCancelButton: true,
              confirmButtonText: 'Save',
            }).then((result) => {
              if (result.isConfirmed) {
                const new_email = document.getElementById('swal-input1').value;
                const new_first_name = document.getElementById('swal-input2').value;
                const new_last_name = document.getElementById('swal-input3').value;
                const new_ip = document.getElementById('swal-input4').value;
                const new_latitude = document.getElementById('swal-input5').value;
                const new_longitude = document.getElementById('swal-input6').value;
      
                const update = [...Data];
                const itemIndex = update.findIndex((item) => item.id === id);
          
                if (itemIndex !== -1) {
                  update[itemIndex].email = new_email;
                  update[itemIndex].first_name = new_first_name;
                  update[itemIndex].last_name = new_last_name;
                  update[itemIndex].ip = new_ip;
                  update[itemIndex].latitude = new_latitude;
                  update[itemIndex].longitude = new_longitude;
                  setUpdatedata(update)
                  setData(update);
                }
                
              }
            });
      
          }
        })
      };
      
    
   
  return (
    <div>
    <nav className="navbar fixed-top navbar-light bg-light" >
        <div className="container-fluid">
            <a className="navbar-brand"><h3>Employee Data</h3></a>
            <form className="d-flex" onSubmit={(e)=>{e.preventDefault();}}>
                <input className="form-control me-2" type="search" placeholder="Search by First Name" aria-label="Search" onChange={getSearchvalue}></input>
                <button className="btn btn-outline-success" onClick={()=>handleSearch()}type="submit">Search</button>
            </form>
        </div>
    </nav>
    
    <div className='container-fluid table-responsive m-4'>
        <table id="myTable" className='table table-stripped'>
            <thead className='table table-dark'>
                <tr>
                <th>Id</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>IP</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map((item,index)=>
                    <tr key={item.id} id={item.id}>
                      <td>{item.id}</td>  
                      <td>{item.email}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.ip}</td>
                      <td>{item.latitude}</td>
                      <td>{item.longitude}</td>
                      <td>{item.created_at}</td>
                      <td>{item.updated_at}</td>
                        <td>
                            <div className='btn-container'>
                            <button className='btn btn-danger' id={item.id} 
                            onClick={()=>del(item.id)}>Delete</button>
                            <button className='btn btn-primary' onClick={()=>update(item.id)}>Edit</button>
                            </div>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        <nav>
             <ul className='pagination'>
                <li className='page-item'>
                    <a href='#' className='page-link'
                    onClick={()=>prePage()}>Prev</a>
                </li>
                {
                    num.map((n,i)=>(
                        <li className={`page-item ${currentPage===n ? 'active' : ''}`} key={i}>
                            <a href='#' className='page-link' onClick={()=>changeCpage(n)}>{n}</a>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <a href='#' className='page-link'
                    onClick={()=>nextPage()}>Next</a>
                </li>

             </ul>
        </nav>
    </div>
    </div>
  )
  function prePage(){
    if(currentPage!==1){
        setcurrentPage(currentPage-1)
    }
  }
  function changeCpage(id)
  {
    setcurrentPage(id)   
  }
  function nextPage(){
    if(currentPage<npage){
        setcurrentPage(currentPage+1)
    }

  }
}

export default Table;