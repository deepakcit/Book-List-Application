import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import bookImg from "../image/bookImg.jpg";
import "./books.css";

function Books() {
    const history = useNavigate();
    const [data, setData] = useState();
    const [show, setShow] = useState(false)
    const [dshow, setDshow] = useState(false);
    const [editshow, setEditshow] = useState(false);
    const [bookid, setBookid] = useState();
    const [valid, setValid] = useState({
        token:null,
        username:null
    });
    const [edata, setEdata] = useState({
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
        
        if(token==="undefined" || token == null){
            history("/login")
        }
    },[])

    useEffect(()=>{
        if(valid.username !== null){
            getData();
        }
    },[valid])

    const getData = async () =>{
        await fetch(`/getbooks/${valid.username}`, {
            method:"GET",
            headers:{
                "Authorization":valid.token
            }
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            // console.log(resdata);
            if(resdata.status === "successfull"){
                setData(resdata);
                setShow(true)
            } else if(resdata.status === "You don't have any books, please add some.."){
                alert("You don't have any books, please add some..")
                setData();
                setShow(false);
            }
        })
    }

    const handleAdd = ()=>{
        history("/addnew")
    }

    const handleLogout = ()=>{
        sessionStorage.clear()
        history("/login")
    }

    const bookdetail = async (id)=>{
        // console.log(id);
        setShow(false)
        setDshow(true);
        setBookid(id);
    }

    const handleDelete = async(id)=>{
        // console.log(id);
        await fetch(`/deletebook/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":valid.token
            }
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            console.log(resdata);
            if(resdata.status ==="successfull"){
                setShow(true);
                setDshow(false);
                getData();
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleEdit = async(id)=>{
        console.log(id);
        setDshow(false);
        setEditshow(true);
    }

    const handleupdate = async ()=>{
        await fetch("/editbook",{
            method:"PUT",
            headers:{
                "content-type":"application/json",
                "Authorization":valid.token
            },
            body:JSON.stringify({
                username:valid.username,
                title:edata.title,
                author:edata.author,
                description:edata.description,
                publishedDate:edata.publishedDate,
                publisher:edata.publisher,
                genre:edata.genre
            })
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.status==="successfull"){
                setShow(true);
                setEditshow(false);
                getData();
            }
        })
    }


  return (
    <div>
        <div className='logoutbtn'>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleAdd}>Add new Book</button>
        </div>
        <h1>Book List</h1>
        <div className='gridbox'>
            {show && data.books.map((item,{id=item._id})=>{
                return(
                    <div className='innerbox' key={id} onClick={()=>bookdetail(id)}>
                        <img className='img' src={bookImg} width="200px" height={"200px"}/>
                        <div>Title:{item.title}</div><div>Author:{item.author}</div><div>Genre:{item.genre}</div>
                    </div>
                )
            })}
        </div>
        <div>
            {dshow && data.books.map((item,{id=item._id})=>{
                return(
                    <div key={id}>
                        {bookid===id?<div>                
                        <p>Title : {item.title}</p>
                        <p>Author : {item.author}</p>
                        <p>Description : {item.description}</p>
                        <p>Published Date : {item.publishedDate}</p>
                        <p>Publisher : {item.publisher}</p>
                        <p>Genre : {item.genre}</p>
                        <button onClick={()=>handleDelete(id)}>Delete Book</button>
                        <button onClick={()=>handleEdit(id)}>Edit Book</button>
                        </div>:""}
                    </div>
                )
            })}
        </div>
        <div>
            {editshow && <div className='editinput'>
            <h1>Edit Book</h1>
            <input type={"text"} required onChange={(e)=>setEdata({...edata,title:e.target.value})} placeholder="Title of the book"/>
            <input type={"text"} required onChange={(e)=>setEdata({...edata,author:e.target.value})} placeholder="Author of the book"/>
            <input type={"text"} required onChange={(e)=>setEdata({...edata,description:e.target.value})} placeholder="Description of the book"/>
            <input type={"date"} required onChange={(e)=>setEdata({...edata,publishedDate:e.target.value})} placeholder="publishedDate of the book"/>
            <input type={"text"} required onChange={(e)=>setEdata({...edata,publisher:e.target.value})} placeholder="publisher of the book"/>
            <input type={"text"} required onChange={(e)=>setEdata({...edata,genre:e.target.value})} placeholder="genre of the book"/>     
            <button onClick={handleupdate}>Update book</button>       
        </div>}
        </div>
    </div>
  )
}

export default Books