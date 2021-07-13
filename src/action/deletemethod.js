import axios from 'axios'


export const deleteNote = (id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
            .then((response)=>{
                //deleteUpdate(response.data._id)
                 const id=response.data._id
                dispatch(notedelete(id))
               // swal(`The item is removed successfully`)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const notedelete= (id)=>{
    return {
        type :'DELETE_NOTE',
        payload : id
    }
}