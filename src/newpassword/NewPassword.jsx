import React, { useEffect, useState } from "react";
import { object, string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./newPassword.css";
import { ToastContainer, toast } from "react-toastify";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";


const BASE_URL = "https://uniqueperfume.onrender.com"

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const notify = (mes) => toast.error(mes);

  useEffect(() => {
      let verifier = localStorage.getItem("verifier")
      if (!verifier) {
          navigate("/")
      }
  }, [])
  //---------------------------------validation Schema-----------------------------
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
 

  const handleSubmitSetPassword = async () => {
    console.log(password, " ", confirmPassword);
    try {
      axios.post(
          `${BASE_URL}/password/SetPassword`,
          { newPassword: password, role: "user" },
          { headers: { verifier: localStorage.getItem("verifier") } }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status == "OK") {
            notify(res.data.msg);
            localStorage.removeItem("verifier");
            navigate("/login");
          } else {
            notify(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("err", err);
      notify(err.message);
    }
  };
  
  return (
    <div className="set-password-parent">
      <div className="form_main">
        <p className="heading-password">Set Password</p>
        <div>
            <ImageList
              sx={{ width: 350, height: 350 }}
              cols={4}
              rows={4}
              rowHeight={50}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img} className="hover-zoom">
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    onClick={(e)=>handleBorder(e, item)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

        <button id="button" onClick={handleSubmitSetPassword}>
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewPassword;
