import React, { useEffect, useState } from 'react'
import './Table.css'
import Swal from 'sweetalert2'
import swal from 'sweetalert'

function Table({data}) {

    const cdata=[...data].sort((a,b)=>{
        let fa=a.first_name.toLowerCase()
        let fb=b.first_name.toLowerCase()
        if(fa<fb)
        {
            return -1;
        }
        if(fa>fb)
        {
            return 1;
        }
        return 0;
    })
    console.log(cdata.id)
    const [updateData,setUpdatedata]=useState(cdata)
    const [Data,setData]=useState(cdata)
    const [searchValue,setSearchvalue]=useState("")

    const [currentPage,setcurrentPage]=useState(1)
    const recordPerPage=10
    const lastIndex=currentPage*recordPerPage
    const firstIndex=lastIndex-recordPerPage
    const records=Data.slice(firstIndex,lastIndex)
    const npage=Math.ceil(Data.length/recordPerPage)
    const num =[]
    const maxVpages=8
    const halfMax=Math.floor(maxVpages/2)
    const startPage=Math.max(1,currentPage-halfMax)
    const endPage=Math.min(npage,startPage+maxVpages-1)
    for(let i=startPage;i<=endPage;i++)
    {
        num.push(i)
    }

    function prePage(){
        if(currentPage!==1){
            setcurrentPage(currentPage-1)
        }}

      function changeCpage(id){
        setcurrentPage(id)   
      }

      function nextPage(){
        if(currentPage<npage){
            setcurrentPage(currentPage+1)
        }}

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

    const add=()=>
    {
       
            
              //console.log("INSIDE")
               Swal.fire({
                title: 'Add Employee',
                html:  
                  `
                  <label for="swal-input1">Email ID  :</label>
                  <input label="email" id="swal-input1" value="" class="swal2-input">
                  <label for="swal-input2">First Name:</label>
                  <input id="swal-input2" value="" class="swal2-input">
                  <label for="swal-input3">Last Name:</label>
                  <input id="swal-input3" value="" class="swal2-input">
                  <label for="swal-input4">IP Address:</label>
                  <input id="swal-input4" value=""class="swal2-input">
                  <label for="swal-input5">Latitude:</label>
                  <input id="swal-input5" value="" class="swal2-input">
                  <label for="swal-input6">Longitude:</label>
                  <input id="swal-input6" value="" class="swal2-input">`,
        
                showCancelButton: true,
                confirmButtonText: 'Add',
              }).then((result) => {
  
                if (result.isConfirmed) {
                  const new_email = document.getElementById('swal-input1').value;
                  const new_first_name = document.getElementById('swal-input2').value;
                  const new_last_name = document.getElementById('swal-input3').value;
                  const new_ip = document.getElementById('swal-input4').value;
                  const new_latitude = document.getElementById('swal-input5').value;
                  const new_longitude = document.getElementById('swal-input6').value;

                  const update = [...Data];
                  let max=1
                  const new_id=update.length+1
                  console.log("new id:"+new_id)
        
                  const now = new Date();
                  const date=( now.getFullYear() + '-' + (now.getDate()) + '-' + now.getMonth() + 1)+ " " + now.getHours() + ':'
                                + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                                .getSeconds()) : (now.getSeconds()))
            
                    const obj ={id:new_id,email:new_email,first_name:new_first_name,last_name:new_last_name,
                        ip:new_ip,latitude:new_latitude,longitude:new_longitude,created_at:date}
                    update.unshift(obj)
                    setUpdatedata(update)
                    setData(update);
                  
                  
                  swal("Updated", "Data has been updated successfully", "success");
                }
              })
    }
  
    const handleSearch=()=>
    {
      let flag=0
      if(searchValue!="")
      {
           const searchData=Data.filter(value=>
            {
                if((value.first_name.toLowerCase()).includes(searchValue.toLowerCase()))
                {
                    flag=1
                    return true
                }
                else
                    return false
                
            })    
        if(flag==0)
        {
           new Swal("Not Found")
        }
        else
          setData(searchData)
    }}

    const del=(id)=>
    {
          swal({
            title: "Are you sure?",
            text: "Are you sure u want to delete this row?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const update=Data.filter(item=>(item.id!=id))
                setUpdatedata(update)
                // console.log("INSIDE DELETE")
                // updateData.map(item=>console.log(item.id))
                setData(update)
            swal({
                title:"Successfully Deleted",
                icon: "success",
              });
            } 
          });
        
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
      }
      
  return (
    <div>
    <nav className="navbar fixed-top navbar-light bg-light" >
        <div className="container-fluid">
            <a className="navbar-brand"><h3>Employee Data</h3></a>
            <form className="d-flex" onSubmit={(e)=>{e.preventDefault();}}>
                <input className="form-control me-2" type="search" placeholder="Search By First Name"
                     aria-label="Search" onChange={getSearchvalue}></input>
                <button className="btn btn-outline-success" onClick={()=>handleSearch()}type="submit">Search</button>
            </form>
        </div>
    </nav>
    {/* <div className='container'> */}
    <div className='table-responsive m-3'>
    <div className='emp-btn'>
        <button className='btn btn-primary' onClick={()=>add()}>Add Employee</button>
    </div>
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
        <nav className='nav'>
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
    // </div>
  )
}
export default Table;