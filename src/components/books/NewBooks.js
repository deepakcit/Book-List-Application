import React, { useEffect, useState } from 'react'
import {useNavigate, Link } from "react-router-dom"

function NewBooks() {
    const history = useNavigate();
    const [valid, setValid] = useState({
        token:null,
        username:null
    })
    const [data, setData] = useState({
        title:null,
        author:null,
        description:null,
        publishedDate:null,
        publisher:null,
        genre:null,
    })

    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        const username = sessionStorage.getItem("username");
        setValid({...valid,token:token,username:username})
        if(token=="undefined" || token === null){
            history("/login")
        }
    },[])

    const handleAdd = async()=>{
        console.log(data);
        if(data.title!==null && data.author!==null && data.description!==null && data.publishedDate!==null, data.publisher!==null && data.genre!==null){
            await fetch("https://book-list-application-10x.onrender.com/addbooks",{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    "Authorization":valid.token
                },
                body:JSON.stringify({
                    username:valid.username,
                    title:data.title,
                    author:data.author,
                    description:data.description,
                    publishedDate:data.publishedDate,
                    publisher:data.publisher,
                    genre:data.genre
                })
            })
            .then((res)=>res.json())
            .then((resdata)=>{
                if(resdata.status === "successfull"){
                    history("/books")
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        } else{
            alert("Enter all data")
        }
    }

  return (
    <div>
        <button onClick={()=>history("/books")}>Show BookList</button>
        <div className='editinput'>
            <h1>Add Book</h1>
            <p>Create new book</p>
            <input type={"text"} onChange={(e)=>setData({...data,title:e.target.value})} placeholder="Title of the book"/>
            <input type={"text"} onChange={(e)=>setData({...data,author:e.target.value})} placeholder="Author of the book"/>
            <input type={"text"} onChange={(e)=>setData({...data,description:e.target.value})} placeholder="Description of the book"/>
            <input type={"date"} onChange={(e)=>setData({...data,publishedDate:e.target.value})} placeholder="publishedDate of the book"/>
            <input type={"text"} onChange={(e)=>setData({...data,publisher:e.target.value})} placeholder="publisher of the book"/>
            <input type={"text"} onChange={(e)=>setData({...data,genre:e.target.value})} placeholder="genre of the book"/>     
            <button onClick={handleAdd}>Add book</button>       
        </div>
    </div>
  )
}

export default NewBooks