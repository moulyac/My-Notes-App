import React, { useState, useEffect} from 'react'
import { BsPencilSquare } from "react-icons/bs";
import {MdDelete} from 'react-icons/md'
import {useDispatch , useSelector } from 'react-redux'
import swal from 'sweetalert'
import { userNotesGet } from '../action/userGetMethod';
import {notesPostMethod} from '../action/postmethod'
import { deleteNote } from '../action/deletemethod';
import './style.css'

const MyNotes = ()=>{
    
    return (
        <div class='mx-5 my-5'>
            <h2 style={{ fontSize:'3rem'}}>My Notes <BsPencilSquare/></h2>
            <NotesContainer/>
        </div>
    )
}

const NotesContainer = ()=>{
    const dispatch = useDispatch()
    const note = useSelector((state)=>{
        return state.notes
    })
    const [notes, setNotes]=useState([])

    useEffect(()=>{//user get notes api call
        dispatch(userNotesGet())
    },[])

    useEffect(()=>{
        setNotes(note)
    },[note])
    
   //console.log(notes)
    return(
        <div className='row'>
            <div className='col-7'>
                <NotesItem
                    notes={notes}
                />
            </div>
            <div className='col-4'>
                <NotesForm />
            </div>
            
        </div>
    )
}

const NotesForm = ()=>{
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body,setBody] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData ={
            title: title,
            body: body
        }

       dispatch(notesPostMethod(formData))
        setTitle('')
        setBody('')
    }

    const handleChange = (e)=>{
        if(e.target.name === 'body'){
            setBody(e.target.value)
        }
        else if(e.target.name === 'title'){
            setTitle(e.target.value)
        }
    }
    return (
        <div class="border" style={{fontFamily:'cursive'}}>
            <h2 style={{textAlign:'center'}} class='mt-3'>Add Note</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label class="form-label">Title</label><br/>
                <input
                    class="form-control"
                    type='text'
                    name='title' 
                    value={title}
                    onChange={handleChange} 
                />
                
                <label class="form-label">Body</label><br/>
                <textarea
                    class="form-control"
                    value={body}
                    name='body'
                    onChange={handleChange}
                ></textarea>
                <br/>
                <input class="btn btn-primary" type='submit' value='save'/>
            </form>
        </div>
    )
}

const NotesItem = ({notes, deleteUpdate})=>{
  //  const [id,setId]=useState()
  //  const [showBody,setShowBody]=useState({})
    const dispatch = useDispatch()
        
    const handleBodyDisplay = (id)=>{

        const res= notes.find((user)=>{
            return user._id === id
        })
       
        swal(`${res.title}`,`${res.body}`)
        
            // axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,{
            //     headers:{
            //         'x-auth':localStorage.getItem('token')
            //     }
            // })
            //     .then((response)=>{
            //         const result=(response.data)
            //         //console.log(result)
            //         if(result.hasOwnProperty('errors')){
            //             alert(result.errors)
            //         }
            //         else{
            //             swal(`${result.title}`,`${result.body}`)
            //         }
            //     })
            //     .catch((err)=>{
            //         console.log(err.message)
            //     })
    }

    const handleDelete= (id)=>{
        
        //swal( '',"The item has been deleted", "success");
        swal({
            title: "Are you sure you want to delete it?",
            text: "Once deleted, you will not be able to recover it back",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteNote(id))
              swal("The item has been delete successfully", {
                icon: "success",
              });
            } 
            
          });
    }

    return (
        <div class='mx-5 my-5' style={{fontFamily:'monospace', fontSize:'2rem'}}>
            {
                notes.length===0? (
                    <div >
                        <h3>no notes found add your frist note</h3>
                    </div>
                ):(
                    <div>
                        <ul>
                            {
                                notes.map((note)=>{
                                    return<li key={note._id}>
                                        <a onClick={()=> handleBodyDisplay(note._id)}
                                        >{note.title} </a><button onClick={()=>handleDelete(note._id)} class='deleteButton' > <MdDelete/> </button></li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
export default MyNotes