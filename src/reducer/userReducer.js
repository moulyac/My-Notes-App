const userInitialState = {}

export const userReducer =(state = userInitialState, action)=>{
    switch(action.type){
        case 'ACCOUNT_DETAILS' : {
            return {...action.payload}
        }
        default : {
            return {...state}
        }
    }
}


const notesInitialState = []
 export const userNotesReducer = (state = notesInitialState , action)=>{
     switch(action.type){
         case 'USER_NOTES':{
             return [...action.payload]
         }

         case 'NOTES_CREATE' :{
             return [...state, {...action.payload}]
         }

         case 'DELETE_NOTE' : {
             return state.filter((user)=>{
                 return user._id !== action.payload
             })
         }

         default : {
             return [...state]
         }
     }
 }