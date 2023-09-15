import React,{useState} from 'react'
import Page from './Page'

export default function TestTable({Ndata}) {
    // const cdata=Sort([...data]) 
   const cdata=[...Ndata]
    const [updateData,setUpdatedata]=useState(cdata)
    const [Data,setData]=useState(cdata)
    const [searchValue,setSearchvalue]=useState("")

    const [currentPage,setcurrentPage]=useState(1)
    const recordPerPage=10
    const lastIndex=currentPage*recordPerPage
    const firstIndex=lastIndex-recordPerPage
    const records=Data.slice(firstIndex,lastIndex)
    const npage=Math.ceil(Data.length/recordPerPage)
    
  return (
    <div>
        <div className='con'>
    <nav className="navbar fixed-top navbar-light bg-light" >
        <div className="container-fluid">
            <a className="navbar-brand"><h3>Employee Data</h3></a>
            <form className="d-flex" onSubmit={(e)=>{e.preventDefault();}}>
                <input className="form-control me-2" type="search" placeholder="Search By First Name"
                     aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
    <div className='table-responsive m-3'>
    <div className='emp-btn'>
        <button className='btn btn-primary'>Add Employee</button>
    </div>
        <table id="myTable" className='table table-hover table-stripped'>
            <thead className='table table-dark'>
                <tr>
                    <th>User Id</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map((item,index)=>
                    <tr key={item.id} id={item.id}>
                      <td>{item.userId}</td>  
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.body}</td>
                        <td>
                            <div className='btn-container'>
                            <button className='btn btn-danger' id={item.id} 
                            >Delete</button>
                            <button className='btn btn-primary'>Edit</button>
                            </div>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        <Page currentpage={currentPage} setcurrentpage={setcurrentPage}nPage={npage}/>
    </div>
    </div>
    </div>
  )
}
