import axios from 'axios'

export const accountGetMethod = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
        })
            .then((response)=>{
                const result=response.data
                console.log(result)
                dispatch(userAccount(result))

            })
            .catch((err)=>{
                alert(err.message)
            })

    }
    
}

export const userAccount = (result)=>{
    return {
        type : 'ACCOUNT_DETAILS',
        payload : result
    }
}


export const userNotesGet = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-user-auth.herokuapp.com/api/notes',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result=response.data
           // console.log(result)
            dispatch(userNotes(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const userNotes = (result)=>{
    return{
        type : 'USER_NOTES',
        payload : result
    }
}