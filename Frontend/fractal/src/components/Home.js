import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';

const Home = () => {
    let ip="http://192.168.137.1"
    const [letterdata,setletterdata]=useState({
        name:"",
        to:"",
        phone:"", 
        subject:"",
        content:"",
    });
    const [isRecieved,setisRecieved]=useState(false);
    const [urlData,seturlData]=useState();
    const [summaryData,setsummaryData]=useState();
    const [final,setfinal]=useState([]);
    const [generating,setgenerating]=useState(false)
    let name, value;
    const handleChange = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setletterdata({ ...letterdata, [name]: value });
    };    
    const send = async (e) => {
         
      e.preventDefault();
          try {
            setfinal([letterdata,urlData,summaryData]); 
            const res = await axios.post(`http://192.168.25.194:5000/send`,final);
            console.log(res.status);
            console.log(res.data.message);
            if(res.status===200) {
              swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
              
          } 
        } 
          catch (err) {
            console.log(err);
          }
    };
    const generate = async (e) => {
        e.preventDefault();
        setgenerating(true);
        try {
            const res = await axios.post(`http://192.168.25.194:5000/generate`,letterdata);
            
            setisRecieved(true);
              seturlData(res.data.pdfurl);
              setsummaryData(res.data.summary);
            setgenerating(false);
          } 
          catch (err) {
            console.log(err);
          }
        };
        let url,summary,gen;
        if(isRecieved){
          url=<div className="form-group mb-3 ms-5 me-5">
              <div class="d-flex flex-row justify-content-between">
                  <label className="form-label label_edits">URL :</label>
                  <input
                    type="text"
                    name="url"
                    disabled
                    className="form-control"
                    value={urlData}
                  />
                  </div>
              </div>
        summary=<div className="form-group mb-3 ms-5 me-5">
                    <label> <b>Summary : </b></label>
                    <div>{summaryData}</div>
                    <button  onClick={send} className="btn btn-warning btn-block mt-2">
                    Send
                  </button>
                </div>
        }
        else{
          url=<div></div>
        }
        if(generating){
            gen=<><button  
            className="btn btn-warning btn-block" disabled>
                      Generating <div class="spinner-border spinner-border-sm" role="status">
  <span class="sr-only"></span>
</div>
                    </button></>
        }
        else{
          gen=<><button  
          className="btn btn-warning btn-block">
                    Generate
                  </button></>
        }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <a class="navbar-brand logo_edit ps-5 pt-3 pe-5 pb-3 h1" href="#">
              FRACTAL
    </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <div className="col-md-6 offset-md-3 mt-3">
              <div className="card-body">
                <form onSubmit={generate} className="form-inline">
                <div class="d-flex flex-row justify-content-between">
                    <div className="form-group mb-3 me-3">
                    <div class="d-flex flex-row justify-content-between">
                        <label className="form-label label_edits">From:</label>
                        <input
                        id="from_input"
                        type="text"
                        name="name"
                        required
                        className="form-control"
                        onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className="form-group mb-3 me-4">
                    <div class="d-flex flex-row justify-content-between">
                        <label className="form-label label_edits">To :</label>
                        <input
                        id="to_input"
                        type="text"
                        name="to"
                        onChange={handleChange}
                        required
                        className="form-control"
                        />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                    <div class="d-flex flex-row justify-content-between">
                        <label className="form-label label_edits2 me-1">Phone Number :</label>
                        <input
                        id="number_input"
                        type="text"
                        name="number"
                        onChange={handleChange}
                        required
                        className="form-control"
                        />
                        </div>
                    </div>
                </div>
                  <div className="form-group mb-3">
                    <label>Subject :</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Content :</label>
                    <input
                      type="textarea"
                      name="content"
                      required
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  {gen}
                </form>
              </div>
            
      </div>
      <div>
        {url}
        {summary}
        </div>      
    </div>
    
  );
};

export default Home;
