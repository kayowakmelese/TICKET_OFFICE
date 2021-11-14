import {  CHANGELANGUAGE, CITY,MONEYREQUEST, ADDTRAVELDATE, ADDORIGINANDDESTINATION, AVAILABLECOMPANY, TRAVELSLOTDETAIL, ADDTRAVELSLOTID, ADDTRAVELSLOTSEATS,SIGNIN, LASTDATE, SEATSTRUCTURE, SEATDATE, PASSENGERINFORMATION, HISTORYDATA, MONEYINFO, RETURNCASH, SEARCHPASSENGER } from "./type";
import {IP,PORT} from '../ip_config'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
axios.interceptors.request.use(
            async config=>{
                
                 const token = await AsyncStorage.getItem('token')
                 const a=await AsyncStorage.getItem("_c_EGB")
                 const b=await AsyncStorage.getItem("_c_BEGB")
                 const c=await AsyncStorage.getItem("_cT_TEGB")
                 console.log("fuck all of you",a+b+c+token)
                 if (token) {
                    
                   config.headers.Authorization = "Bearer "+token;
                config.headers.common['_c_EGB']=a
                config.headers.common['_c_BEGB']=b
                config.headers.common['_cT_TEGB']=c

                 }else{
                     console.log("fuck toekn")
                 }
                
                return config
            }
        
    
    
)
export const setLanguage=(languageCode)=>{
    return {
        type:CHANGELANGUAGE,
        language:languageCode
    }
}
export const setCityData=(isLoading,error,success,citydata)=>{
    return {
        type:CITY,
        isLoading:isLoading,
        success:success,
        error:error,
        data:citydata
    }
}
export const setMoneyRequest=(isLoading,error,success,citydata)=>{
    return {
        type:MONEYREQUEST,
        isLoading:isLoading,
        success:success,
        error:error,
        data:citydata
    }
}
export const setMoneyData=(isLoading,error,success,money)=>{
    return {
        type:MONEYINFO,
        isLoading:isLoading,
        success:success,
        error:error,
        data:money
    }
}
export const setCashReturn=(isLoading,error,success,money)=>{
    return {
        type:RETURNCASH,
        isLoading:isLoading,
        success:success,
        error:error,
        data:money
    }
}
export const setSearchPassenger=(isLoading,error,success,money)=>{
    return {
        type:SEARCHPASSENGER,
        isLoading:isLoading,
        success:success,
        error:error,
        data:money
    }
}
export const setTravelDate=(travelDate)=>{
    return {
        type:ADDTRAVELDATE,
        isDraft:true,
        date:travelDate
    }
}
export const setHistoryData=(isLoading,error,success,data)=>{
    return {
        type:HISTORYDATA,
        isLoading,error,success,data
    }
}
export const setSlotId=(slotId)=>{
    return {
        isDraft:true,
        type:ADDTRAVELSLOTID,
        travelSlotId:slotId
    }
}
export const setSeatIds=(seatIds)=>{
    return {
        isDraft:true,
        type:ADDTRAVELSLOTSEATS,
        seatIds:seatIds
    }
}
export const setTravelOandD=(origin,destination)=>{
    return {
        type:ADDORIGINANDDESTINATION,
        isDraft:true,
        origin:origin,
        dest:destination
    }
}
export const setPassengerInfo=(isLoading,error,success)=>{
    return {
        type:PASSENGERINFORMATION,
        isLoading,error,success
    }
}
export const setSignIn=(isLoading,phoneNumber,isSigned,inited,token,userId,companyId)=>{
    return {
        type:SIGNIN,
        isLoading,
        isSigned,
        phoneNumber,
        inited,
        token,
        userId,
        companyId,
    }
}
export const setLastTravelDate=(isLoading,date,error)=>{
    return {
        type:LASTDATE,
        isLoading,
        date,
        error
    }
}

export const setSeatData=(isLoading,error,success,data)=>{
    return {
        type:SEATDATE,
        isLoading,error,success,data
    }
}
export const setSeatStructure=(isLoading,error,success,data)=>{
    return {
        type:SEATSTRUCTURE,
        isLoading,error,success,data
    }
}
export const setAvailableCompany=(isLoading,error,success,data)=>{
    return {
        type:AVAILABLECOMPANY,
        isLoading,error,success,data
    }
}
export const setCompanyDetail=(isLoading,error,success,data)=>{
    return {
        type:TRAVELSLOTDETAIL,
        isLoading,error,success,data
    }
}
export const addTravelOriginAndDestination=(origin,destination)=>{
    return dispatch=>{
        dispatch(setTravelOandD(origin,destination))
        console.log("i have dispatched",origin+destination)
    }
}

export const loadHistoryData=()=>{
    return dispatch=>{
        dispatch(setHistoryData(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/book/getLatestBookHistoryByUId`,{}).then((data)=>{
                if(data.data){
                    console.log("this is the response",data.data)
                    dispatch(setHistoryData(false,null,null,data.data))

                }
        }).catch((e)=>{console.log("error",e)})

    }
}
export const searchPassengerData=(id)=>{
    return dispatch=>{
        let params={
            bookNumber:id
        }
        console.log("params are",params)
        dispatch(setSearchPassenger(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/book/getUnPayedBookByPNo`,params).then((data)=>{
                if(data.data){
                    console.log("this is the response",data.data)
                    dispatch(setSearchPassenger(false,null,null,data.data))

                }
        }).catch((e)=>{console.log("error",e)})

    }
}
export const addSeatInformation=(isloading,data)=>{
        return dispatch=>{
            dispatch(setSeatData(isloading,null,null,data))
        }
}
export const checkSigned=()=>{
    
    return async function(dispatch){
        dispatch(setSignIn(true,null,false,false,null,null,null))
        AsyncStorage.getItem("token").then((number)=>{
            console.log(number)
            number=number.toString();
            if(number.length>0){
                console.log("i am hereT",number)
                dispatch(setSignIn(false,number,true,true,number,null))
            }else{
                dispatch(setSignIn(false,null,false,true))
            }
            
        }).catch((error)=>{dispatch(setSignIn(false,"nothing here",false,true));console.log("first of all","fuck you")})
    }
}
export const sendPassengerData=(travelId,passengerData)=>{
    return dispatch=>{
        dispatch(setPassengerInfo(true,null,null))
        let params={
            TravelDateSlotId:travelId,
            passanger:passengerData
        }
        console.log("params",params)
        axios.post(`http://${IP}:${PORT}/api/book/bookCU`,params).then((data)=>{
            if(data){
                console.log("i think its suceess",data.data);
                dispatch(setPassengerInfo(false,null,"booked successfully"))
            }else{
                console.log("ladies and gentlemen its null")
            }
        }).catch((err)=>console.log("last error",err))
    }
}
export const fetchDate=()=>{
    return dispatch=>{
        dispatch(setLastTravelDate(true,null,null))
        axios.get(`http://${IP}:${PORT}/api/travel/getLastTravelDate`,{}).then((resp)=>{
            dispatch(setLastTravelDate(false,resp.data[0].fullDate,null))

        }).catch((e)=>{console.log("eror",e);dispatch(setLastTravelDate(false,null,e))
    })
    }
}
export const setSigned=(phonenumber,password)=>{
        console.log("p",phonenumber)
    return async function(dispatch){
        let params={
            phoneNo:phonenumber,
            password:password
        }
        dispatch(setSignIn(true,null,null,null,null,null,null))
        console.log(params)
        axios.post(`http://${IP}:${PORT}/api/auth/signInTicketMan`,params).then((dat)=>{
                console.log("respone",dat.data)
                if(dat.data){
                    console.log("this is it",dat.data._c_BEGB)
                    if(dat.data.login==="success"){
                        console.log("i am here",dat.data._c_EGB)
                        
                        dispatch(setSignIn(false,phonenumber,true,1,dat.data.token,dat.data._c_EGB,dat.data._c_BEGB))
                        console.log("i have dispatched")
                        AsyncStorage.setItem("token",dat.data.token).then(()=>console.log("i am donezo")).catch((r)=>console.log("erra",r))
                        AsyncStorage.setItem("_c_EGB",dat.data._c_EGB).then(()=>console.log("i am donezo")).catch((r)=>console.log("erra",r))
                        AsyncStorage.setItem("_c_BEGB",dat.data._c_BEGB).then(()=>console.log("i am donezo")).catch((r)=>console.log("erra",r))
                        AsyncStorage.setItem("_cT_TEGB",dat.data._cT_TEGB).then(()=>console.log("done")).catch((r)=>console.log("erra",r))
                    }else{
                        console.log("i am not here")
                        dispatch(setSignIn(false,null,null,null,null,null,null))
                    }
                        console.log("the token is",dat.data)
                }else{
                    console.log("no network")
                }
        }).catch((e)=>{dispatch(setSignIn(false,null,null,null,null,null,null))})
        console.log("phonenumber",phonenumber)
       
    }
}
export const addCitys=()=>{
    return dispatch=>{
        dispatch(setCityData(false,null,"data loaded successfully",[
            {
             "name":   "Addis Ababa"
            },
            {
                "name":   "Mekelle"
            },
            {
                "name":   "Gondar"
            },
            {
                "name":   "Adama"
            },
            {
                "name":    "Awassa"
            },
            {
                "name": "Bahir Dar"
            },
            {
                "name":  "Dire Dawa"
            },
            {
                "name":  "Sodo"
            },
            {
                "name":  "Dessie"
            },
            {
                "name":  "Jimma"
            },
            {
                "name":  "Jijiga"
            },
            {
                "name": "Shashamane"
            },
            {
                "name": "Bishoftu"
            },
            {
                "name":   "Arba Minch"
            },
            {
                "name":  "Hosaena"
            },
            {
                "name":  "Harar"
            },
            {
                "name":  "Dilla"
            },
            {
                "name":   "Nekemte"
            },
            {
                "name":   "Debre Birhan"
            },
            {
                "name":    "Asella"
            },
            {
                "name":  "Debre Markos"
            },
            {
                "name": "Kombolcha"
            },
            {
                "name":  "Debre Tabor"
            },
            {
                "name": "Adigrat"
            },
            {
                "name":  "Weldiya"
            },
            {
                "name":  "Sebeta"
            },
            {
                "name":   "Burayu"
            },
            {
                "name": "Shire"
            },
            {
                "name":    "Ambo"
            },
            {
                "name":  "Arsi Negele"
            },
            {
                "name": "Aksum"
            },
            {
                "name":     "Gambela"
            },
            {
                "name":   "Bale Robe"
            },
            {
                "name":  "Butajira"
            },
            {
                "name":   "Batu"
            },
            {
                "name":     "Adwa"
            },
            {
                "name":  "Areka"
            },
            {
                "name": "Yirgalem"
            },
            {
                "name":  "Waliso"
            },
            {
                "name":   "Welkite"
            },
            {
                "name":  "Gode"
            },
            {
                "name":   "Meki"
            },
            {
                "name":  "Negele Borana"
            },
            {
                "name":    "Alaba Kulito"
            },
            {
                "name":    "Alamata"
            },
            {
                "name":   "Chiro"
            },
            {
                "name":  "Tepi"
            },
            {
                "name":   "Durame"
            },
            {
                "name":   "Goba"
            },
            {
                "name":  "Assosa"
            },
            {
                "name":  "Boditi"
            },
            {
                "name":   "Gimbi"
            },
            {
                "name": "Wukro"
            },
            {
                "name": "Haramaya"
            },
            {
                "name":  "Mizan Teferi"
            },
            {
                "name":    "Sawla"
            },
            {
                "name":  "Mojo"
            },
            {
                "name":    "Dembi Dolo"
            },
            {
                "name":  "Aleta Wendo"
            },
            {
                "name":  "Metu"
            },
            {
                "name":  "Mota"
            },
            {
                "name":  "Fiche"
            },
            {
                "name": "Finote Selam"
            },
            {
                "name":  "Bule Hora"
            },
            {
                "name":   "Bonga"
            },
            {
                "name": "Kobo"
            },
            {
                "name":   "Jinka"
            },
            {
                "name": "Dangila"
            },
            {
                "name":   "Degehabur"
            },
            {
                "name":    "Dimtu"
            },
            {
                "name":  "Agaro"
            }
        ]))
    }
}
export const moneyReturnRequest=(price,infs,image)=>{
    return async dispatch=>{
        console.log("prices",price.toString()+infs.toString())
        let x=new FormData();
        console.log("imager",image)
        x.append("image",image[0])
        x.append("amount",price)
        x.append("remark",infs)
        console.log("imager",x._parts)
        dispatch(setCashReturn(true,null,null))
               axios.post(`http://${IP}:${PORT}/api/finance/requestCashReturn`,x).then((data)=>{
                   if(data.data){
                    dispatch(setCashReturn(false,"success",null,data.data))
                   }
            console.log("the data",data.data)
        }).catch((e)=>console.log("klet",e))
      
       
        
    }
}
export const moneyReturnData=()=>{
    return  dispatch=>{
       
                dispatch(setCashReturn(true,null,null,null,null))
               axios.get(`http://${IP}:${PORT}/api/finance/getOwnCashRequest`,{}).then((data)=>{
                   if(data.data){
                    dispatch(setCashReturn(false,"success",null,data.data))
                    console.log("the data",data.data)
                   }
            console.log("the data",data.data)
        }).catch((e)=>console.log("klet",e))
      
       
        
    }
}
export const addAvailableCompany=(origin,destination,travelDate)=>{
    return dispatch=>{
        let params={destnationBranchName:destination,date:moment(travelDate).format("YYYY-MM-DD")
        }
        console.log("whohertick",params)
        
        dispatch(setAvailableCompany(true,[],null,null))
        axios.post(`http://${IP}:${PORT}/api/travel/searchTravelByDateByTM`,params).then((data)=>{
                    console.log("response",JSON.stringify(data.data))
                    dispatch(setAvailableCompany(false,null,null,data.data))

        }).catch((e)=>{console.log("Errorx",e);dispatch(setAvailableCompany(false,null,null,null))})
    }
}
export const addMoneyInfo=()=>{
    return dispatch=>{
        dispatch(setMoneyData(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/user/getTicketManInfo`,{}).then((data)=>{
                    console.log("response",JSON.stringify(data.data))
                    dispatch(setMoneyData(false,null,"success",data.data))
                   

        }).catch((e)=>{console.log("Errory",e);dispatch(setMoneyData(false,null,null,null))})
    }
}
export const addSeatStructure=(travelid)=>{
    return dispatch=>{
        let params={
            travelId:travelid
        }
        
        dispatch(setSeatStructure(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/bus/getSeatStructureByTId`,params).then((data)=>{
                    console.log("===================",JSON.stringify(data.data))
                    dispatch(setSeatStructure(false,null,null,data.data))

        }).catch((e)=>{console.log("Error",e);dispatch(setSeatStructure(false,null,null,null))})
    }
}
export const addCompanyDetail=(companyId)=>{
    return dispatch=>{
        let params={companyId}
        dispatch(setCompanyDetail(false,null,"data loaded successfully",))
    }
}
export const addTravelDate=(travelDate)=>{
    return dispatch=>{
        dispatch(setTravelDate(travelDate))
    }
}
export const ChangeLanguageValue=(languagecode)=>{
    return dispatch=>{
        dispatch(setLanguage(languagecode))
    }
}
