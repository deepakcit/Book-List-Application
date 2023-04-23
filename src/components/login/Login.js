import React, { useRef, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

function Login() {
    const [data, setData] = useState({
        username:null,
        password:null
    });
    const history = useNavigate();
    const inputelem1 = useRef();
    const inputelem2 = useRef();

const handleLogin = async ()=>{
    if(data.username !== null && data.password !== null){
        await fetch("/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                username:data.username,
                password:data.password
            })
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status === "successfull"){
                sessionStorage.setItem("token",resdata.token);
                sessionStorage.setItem("username",resdata.username);
                history("/books")
            } else {
                alert(resdata.status)
                inputelem1.current.value = "";
                inputelem2.current.value = "";
            }
        })
    } else {
        alert("enter all details")
    }
}

  return (
    <div>
        <div className='regisBox'>
            <h1>Member login</h1>
            <input type={"text"} placeholder="username" required onChange={(e)=>setData({...data,username:e.target.value})}/>
            <input type={"password"} placeholder="password" required onChange={(e)=>setData({...data,password:e.target.value})}/>
            <button onClick={handleLogin}>Login</button>
            <Link to={"/"}><p>Register Page</p></Link>
        </div>
    </div>
  )
}

export default Login