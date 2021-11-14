import { SIGNIN,SIGNOUT,REQUESTDRIVER } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    isLoading:false,
    phoneNumber:null,
    isSigned:false,
    inited:false,
    token:null,
    userId:null,
    companyId:null
}


const signedInfoReducer=(state=initialState,action)=>{
    switch(action.type){
        case SIGNIN:
            console.log(action)
            return {isLoading:action.isLoading,isSigned:action.isSigned,phoneNumber:action.phoneNumber,inited:action.inited,token:action.token,userId:action.userId,companyId:action.companyId}
            default: return state;
    }
}
export default signedInfoReducer;