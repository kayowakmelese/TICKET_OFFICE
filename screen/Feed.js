import { faArrowRight, faArrowUp, faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../style/styles'
import moment from 'moment'
import { connect } from 'react-redux'
import { moneyReturnData } from '../action'


const Feed=(params)=>{
    React.useEffect(()=>{
        params.getData();
    },[])
   
    const [data,setData]=React.useState(null)

    return (
        <ScrollView style={{padding:10,backgroundColor:'#eee'}}>
        <TouchableOpacity style={{padding:5,backgroundColor:'orange',borderRadius:5,width:30}}>
        <FontAwesomeIcon icon={faFire} color={'white'} size={20}/>
        </TouchableOpacity>
        
            <Text style={{fontSize:20,fontWeight:'bold'}}>Coming Soon</Text>
            <Text style={{fontSize:8,color:'gray'}}>this feature will be available on the next version</Text>
            <TouchableOpacity onPress={()=>params.navigation.navigate("CashReturn")} style={{backgroundColor:'white',padding:10,borderRadius:5,marginTop:20,flexDirection:'row',marginBottom:5}}>
                <View >
                <Text style={{fontSize:18,fontWeight:'bold'}}>Return Cash</Text>
                <Text style={{fontSize:8,color:'gray'}}>Click here for cash return requesr</Text>
                </View>
                <View style={{position:'absolute',right:10,justifyContent:'center',alignSelf:'center'}}>
                <FontAwesomeIcon icon={faArrowRight} color={'blue'} size={20}/>

                </View>
               
            </TouchableOpacity>
            <View>
                {params.data?params.data.map((dat)=>{
                    let approved="";
                   
                    let x=new moment(dat.createdAt);
                    return <View style={{padding:10,backgroundColor:'white',borderRadius:5,marginVertical:'1%',flexDirection:'row'}}>
                    <View style={{width:'50%'}}>
                        <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>{dat.amount}</Text>
                        <Text style={{fontSize:8,color:'gray'}}>amount</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:'black',fontSize:10,fontWeight:'bold'}}>{x.format("DD-MM-YYYY")}</Text>
                        <Text style={{fontSize:8,color:'gray'}}>{x.format("dddd")}</Text>
                    </View>
                            <View style={{backgroundColor:dat.status==="pending"?"darkgray":dat.status==="approved"?"green":"orange",borderRadius:2,padding:5,alignItems:'center',justifyContent:'center',position:'absolute',right:10,alignSelf:'center'}}><Text style={{fontSize:8,color:'white'}}>{dat.status}</Text></View>
                    </View>
                }):null}
            </View>
        </ScrollView>
    )
}
const mapStateToProps=state=>{
    return {
      data:state.returnCashReducer.data,
      isLoading:state.returnCashReducer.isLoading
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getData:()=>dispatch(moneyReturnData())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Feed)