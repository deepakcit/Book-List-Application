import React, { useRef, useState } from 'react'
import {useNavigate, Link} from "react-router-dom";
import "./register.css"

function Register() {
    const inputelem1 = useRef();
    const inputelem2 = useRef();
    const inputelem3 = useRef();
    const [data, setData] = useState({
        username:null,
        password:null,
    });
    const [cpass, setCpass] = useState();
    const history = useNavigate();

    const handleClick = async()=>{
        if(data.username !==null && data.password !== null){
            if(cpass === data.password){
                await fetch("https://book-list-application-10x.onrender.com/signup",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify({
                        username:data.username,
                        password:data.password,
                    })
                })
                .then((res)=>res.json())
                .then((resdata)=>{
                    console.log(resdata);
                    if(resdata.status==="user already exist"){
                        alert("user already exist")
                        inputelem1.current.value = ""
                        inputelem2.current.value = ""
                        inputelem3.current.value = ""
                    } else if(resdata.status === "successfull"){
                        alert("successfull")
                        history("/login")
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            } else {
                alert("password doesn't matched")
                inputelem1.current.value = ""
                inputelem2.current.value = ""
                inputelem3.current.value = ""
            }

        } else {
            alert("enter all details")
        }

    }



  return (
    <div>
        <div className='regisBox'>
            <h1>Register</h1>
            <input ref={inputelem1} type={"text"} placeholder="username" required onChange={(e)=>setData({...data,username:e.target.value})}/>
            <input ref={inputelem2} type={"password"} placeholder="password" required onChange={(e)=>setData({...data,password:e.target.value})}/>
            <input ref={inputelem3} type={"password"} placeholder ="confirm password" required onChange={(e)=>setCpass(e.target.value)}/>
            <button onClick={handleClick}>Register</button>
            <Link to={"/login"}><p>Login page</p></Link>
        </div>
    </div>
  )
}

export default Register