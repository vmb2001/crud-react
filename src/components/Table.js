import React, { useEffect, useState } from "react";
import "./Table.css";
import Swal from "sweetalert2";
import swal from "sweetalert";
import Page from "./Page";

function Table({ data }) {
  const Sort = (newdata) => {
    const ndata = [...newdata].sort((a, b) => {
      let fa = a.first_name.toLowerCase();
      let fb = b.first_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    return ndata;
  };
  const cdata = Sort([...data]);
  const [updateData, setUpdatedata] = useState(cdata);
  const [Data, setData] = useState(cdata);
  const [searchValue, setSearchvalue] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const recordPerPage = 9;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordPerPage);

  const add = () => {
    Swal.fire({
      title: "Add Employee",
      html: `<div className="form-group"><label for="swal-input1"  style="width: 100px;">Email ID:</label>
        <input label="email" id="swal-input1" value="" class="swal2-input"><div/>
        <div className="form-group"><label for="swal-input2" style="width: 100px;">First Name:</label>
        <input id="swal-input2" value="" class="swal2-input"><div/>
        <div className="form-group"><label for="swal-input3" style="width: 100px;">Last Name:</label>
        <input id="swal-input3" value="" class="swal2-input"><div/>
        <div className="form-group"><label for="swal-input4" style="width: 100px;">IP Address:</label>
        <input id="swal-input4" value="" class="swal2-input"><div/>
        <div className="form-group"><label for="swal-input5" style="width: 100px;">Latitude:</label>
        <input id="swal-input5" value="" class="swal2-input"><div/>
        <div className="form-group"><label for="swal-input6" style="width: 100px;">Longitude:</label>
        <input id="swal-input6" value="" class="swal2-input"><div/>`,

      showCancelButton: true,
      confirmButtonText: "Add",
    }).then((result) => {
      if (result.isConfirmed) {
        const new_email = document.getElementById("swal-input1").value;
        const new_first_name = document.getElementById("swal-input2").value;
        const new_last_name = document.getElementById("swal-input3").value;
        const new_ip = document.getElementById("swal-input4").value;
        const new_latitude = document.getElementById("swal-input5").value;
        const new_longitude = document.getElementById("swal-input6").value;

        let update = [...Data];
        let items = [];
        update.map((item) => items.push(item.id));
        const m = Math.max(...items);
        const new_id = m + 1;

        const now = new Date();
        const date =
          now.getFullYear() +
          "-" +
          now.getDate() +
          "-" +
          now.getMonth() +
          1 +
          " " +
          now.getHours() +
          ":" +
          (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
          ":" +
          (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());

        const obj = {
          id: new_id,
          email: new_email,
          first_name: new_first_name,
          last_name: new_last_name,
          ip: new_ip,
          latitude: new_latitude,
          longitude: new_longitude,
          created_at: date,
        };
        update.unshift(obj);
        update = Sort(update);
        setUpdatedata(update);
        setData(update);

        swal("Added", "Data has been added successfully", "success");
      }
    });
  };

  const getSearchvalue = (e) => {
    //setData(updateData)
    const s = e.target.value;
    // console.log("search:"+s)
    if (s == "") {
      //  console.log("INSIDE EMPTY SEARCH")
      updateData.map((item) => console.log(item.id));
      setData(updateData);
      setSearchvalue("");
      // console.log("Searchvalue:"+searchValue)
    } else setSearchvalue(s);
  };

  const handleSearch = () => {
    let flag = 0;
    if (searchValue !== "") {
      const searchData = Data.filter((value) => {
        if (
          value.first_name.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          flag = 1;
          return true;
        } else return false;
      });
      if (flag === 0) new Swal("Not Found");
      else setData(searchData);
    }
  };

  const del = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure u want to delete this row?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const update = Data.filter((item) => item.id != id);
        setUpdatedata(update);
        // console.log("INSIDE DELETE")
        // updateData.map(item=>console.log(item.id))
        setData(update);
        swal({
          title: "Successfully Deleted",
          icon: "success",
        });
      }
    });
  };

  const update = (id) => {
    Data.map((item) => {
      if (item.id === id) {
        // console.log("INSIDE")
        Swal.fire({
          title: "Edit Employee Details",
          html: `<div className="form-group"><label for="swal-input1"  style="width: 100px;">Email ID:</label>
              <input label="email" id="swal-input1" value=${item.email} class="swal2-input"><div/>
              <div className="form-group"><label for="swal-input2" style="width: 100px;">First Name:</label>
              <input id="swal-input2" value=${item.first_name} class="swal2-input"><div/>
              <div className="form-group"><label for="swal-input3" style="width: 100px;">Last Name:</label>
              <input id="swal-input3" value=${item.last_name} class="swal2-input"><div/>
              <div className="form-group"><label for="swal-input4" style="width: 100px;">IP Address:</label>
              <input id="swal-input4" value=${item.ip} class="swal2-input"><div/>
              <div className="form-group"><label for="swal-input5" style="width: 100px;">Latitude:</label>
              <input id="swal-input5" value=${item.latitude} class="swal2-input"><div/>
              <div className="form-group"><label for="swal-input6" style="width: 100px;">Longitude:</label>
              <input id="swal-input6" value=${item.longitude} class="swal2-input"><div/>`,

          showCancelButton: true,
          confirmButtonText: "Save",
        }).then((result) => {
          if (result.isConfirmed) {
            const new_email = document.getElementById("swal-input1").value;
            const new_first_name = document.getElementById("swal-input2").value;
            const new_last_name = document.getElementById("swal-input3").value;
            const new_ip = document.getElementById("swal-input4").value;
            const new_latitude = document.getElementById("swal-input5").value;
            const new_longitude = document.getElementById("swal-input6").value;

            let update = [...Data];
            const itemIndex = update.findIndex((item) => item.id === id);
            const now = new Date();
            const date =
              now.getFullYear() +
              "-" +
              now.getDate() +
              "-" +
              now.getMonth() +
              1 +
              " " +
              now.getHours() +
              ":" +
              (now.getMinutes() < 10
                ? "0" + now.getMinutes()
                : now.getMinutes()) +
              ":" +
              (now.getSeconds() < 10
                ? "0" + now.getSeconds()
                : now.getSeconds());

            if (itemIndex !== -1) {
              update[itemIndex].email = new_email;
              update[itemIndex].first_name = new_first_name;
              update[itemIndex].last_name = new_last_name;
              update[itemIndex].ip = new_ip;
              update[itemIndex].latitude = new_latitude;
              update[itemIndex].longitude = new_longitude;
              update[itemIndex].updated_at = date;
              update = Sort(update);
              setUpdatedata(update);
              setData(update);
            }
            swal("Updated", "Data has been updated successfully", "success");
          }
        });
      }
    });
  };

  return (
    <div className="con">
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            <h3>Employee Data</h3>
          </a>
          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search By First Name"
              aria-label="Search"
              onChange={getSearchvalue}
            ></input>
            <button
              className="btn btn-outline-success"
              onClick={() => handleSearch()}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="table-responsive m-3">
        <div className="emp-btn">
          <button className="btn btn-primary" onClick={() => add()}>
            Add Employee
          </button>
        </div>
        <table id="myTable" className="table table-hover table-stripped">
          <thead className="table table-dark">
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
            {records.map((item, index) => (
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
                  <div className="btn-container">
                    <button
                      className="btn btn-danger"
                      id={item.id}
                      onClick={() => {
                        window.datalayer.push({ event: "delete button" });
                        del(item.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => update(item.id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Page
          currentpage={currentPage}
          setcurrentpage={setcurrentPage}
          nPage={npage}
        />
      </div>
    </div>
  );
}
export default Table;
