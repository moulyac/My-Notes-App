import axios from 'axios'

export const postMethodRegister = (values)=>{
    return (dispatch)=>{
    axios.post('https://dct-user-auth.herokuapp.com/users/register',values)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                }
                else{
                    dispatch(stateRegister(true))
                }
            })
            .catch((err)=>{
                
            })
        }   
}

export const stateRegister = (b)=>{
    return{
        type: 'REGISTER',
        payload: b
    }
}


export const postMethodLogin = (formData)=>{
    return (dispatch)=>{
        axios.post('https://dct-user-auth.herokuapp.com/users/login',formData)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){//Object.keys(result).includes(errros)
                    alert(result.errors)
                }else{
                    dispatch(stateLogin(true))
                    localStorage.setItem('token',result.token)
                   // props.history.push('/')
                   // props.handleAuth()
                    alert('successfully logged in' )
                }
            })
            .catch((err)=>{
                //console.log(err.message)
            })
    }
}

export const stateLogin = (b)=>{
    return{
        type : 'LOGIN',
        payload : b
    }
}


export const notesPostMethod = (formData)=>{
    return (dispatch)=>{
        axios.post('https://dct-user-auth.herokuapp.com/api/notes',formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
                .then((response)=>{
                    const result=(response.data)
                    if(result.hasOwnProperty('errors')){
                        alert(result.errors)
                    }
                    else{
                       // console.log(result)
                        dispatch(notesCreate(result))
                       // setTitle('')
                       // setBody('')
                    }
                })
                .catch((err)=>{
                    console.log(err.message)
                })
    }
}

export const notesCreate = (result)=>{
    return{
        type : 'NOTES_CREATE',
        payload : result
    }
}