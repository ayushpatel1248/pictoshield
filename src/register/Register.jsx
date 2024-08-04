import React, { useState } from "react";
import "./register.css";
import registerImg from "../images/pictoshield.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios, { Axios } from 'axios';

const baseurl = "https://uniqueperfume.onrender.com"

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const notify = (notifyMessage) => toast(notifyMessage);

  const handleBorder = (e, item)=>{
    e.target.classList.toggle("borderRed") 
    if(item.clicked){
      item.clicked=false;
    }
    else{
      item.clicked=true;
      setPassword(item.code + password)
    }
    console.log(password)
}

 
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      code:"320",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      code:"323",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      code:"420",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      code:"329",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      code:"520",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      code:"32",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      code:"2",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      code:"33",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      code:"37",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      code:"389",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      code:"60",
      clicked:false
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      code:"77",
      clicked:false
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdw7fCuQ-Oe--n3ZCVLD9p3g72fRBrXMcBxA&usqp=CAU",
      title: "dies",
      code:"99",
      clicked:false
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6r6q3JZx8pkJzqCuooS7UO87jlj4hk23f8yAFxG46iwQvEDQT4BeV7uVwdZ-SLYCLDk&usqp=CAU",
      title: "cake",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILz0NEOVwVgjgqjOPrCCO5VBG8VFMgog_OA&usqp=CAU",
      title: "rocket",
      code:"54",
      clicked:false
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLTU8WbvmS2aIIuXnu7_5vQGSH6gC56I3M4w&usqp=CAU",
      title: "cheetah",
      code:"82",
      clicked:false
    },
  ];


const handleRegister = async (ev) => {
  ev.preventDefault();
  console.log("we are here in register handler")
  try {

    const apiFetched = await axios.post(`${baseurl}/register`, { userName, email, mobileNumber:"9907576767", password })
    console.log("api answer = ", apiFetched)
    console.log(apiFetched.data.data)
    if (apiFetched.data.status == "OK" || apiFetched.data.status == "ok") {
      localStorage.setItem("authorization", apiFetched.data.data.authToken)
      notify(apiFetched.data.msg)
      navigate("/")
    }else{
      notify(apiFetched.data.msg)
    }

  }
  catch (err) {
    notify(err.message)
  }
}

  return (
    <div className="resgisterBody">
      <div class="wrapper">
        <h2>Registration</h2>
        <form className="registrationForm">
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter your userName"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div class="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <h3>PASSWORD</h3>
            <ImageList
              sx={{ width: 350, height: 350 }}
              cols={4}
              rows={4}
              rowHeight={50}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img} className="hover-zoom" >
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    onClick={(e)=>{handleBorder(e, item)}}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          <div class="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>

          <div class="input-box button">
            <input type="Submit" onClick={handleRegister}/>
          </div>

          <div class="text">
            <h3>
              Already have an account? <Link to="/login">Login now</Link>
            </h3>
          </div>
        </form>
      </div>
      <div>
        <div className="registerImage">
          {" "}
          <img src={registerImg}></img>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
