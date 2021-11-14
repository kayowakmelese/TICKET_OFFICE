import { faFire, faUser,faPen, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity,Image} from 'react-native'
import { connect } from 'react-redux'
import { addMoneyInfo } from '../action'
import styles from '../style/styles'


const Profile=(params)=>{
    const [data,setData]=React.useState(null);
    React.useEffect(()=>{
        params.loadMoney()
    },[])
    React.useEffect(()=>{
        if(params.data){
            setData(params.data[0])
        }
    },[params.data])
    return (
        data?<View style={[styles.container,{backgroundColor:'#eee'}]}>
        
        <TouchableOpacity style={{backgroundColor:'white',padding:15,width:'100%',borderRadius:5,flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:'#eee',borderRadius:10,height:80,width:80,alignContent:'center'}}>
{/* <FontAwesomeIcon icon={faUser} color={'blue'} size={25} style={{alignSelf:'center',flexDirection:'row',margin:'20%'}}/> */}
                   <Image source={require('../assets/profile.png')} style={{height:'100%',width:'100%',borderRadius:10}}/>
                    </View>
                    <View style={{paddingHorizontal:10,marginVertical:5,alignSelf:'center',alignContent:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center'}}>{data.TicketMan.TicketOffice.name}</Text>
                        <Text style={{fontWeight:'bold',color:'green',fontSize:10,alignSelf:'center'}}>verified ticket man account</Text>

                        <Text style={{fontSize:8,color:'black',alignSelf:'center'}}>{data.phoneNo}</Text>
                    </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:'2%'}}>
                <TouchableOpacity style={{width:'49%',backgroundColor:'green',padding:10,borderRadius:5,flexDirection:'row'}}>
                        <View style={{justifyContent:"center",opacity:0.5}}>                       
                         <FontAwesomeIcon icon={faDollarSign} color={'white'} size={20}/>
</View>
                        <View>
                            <Text style={{fontWeight:'bold',fontSize:18,color:'white'}}>{data.UserAccount.balance} birr</Text>
                            <Text style={{fontSize:10,fontWeight:'bold',color:'white'}}>your account right now</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'49%',backgroundColor:'orange',marginLeft:5,padding:10,borderRadius:5,flexDirection:'row'}}>
                        <View style={{justifyContent:"center",opacity:0.5}}>                       
                         <FontAwesomeIcon icon={faDollarSign} color={'white'} size={20}/>
</View>
                        <View>
                            <Text style={{fontWeight:'bold',fontSize:18,color:'white'}}>2580birr</Text>
                            <Text style={{fontSize:10,fontWeight:'bold',color:'white'}}>cash you have to return</Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>:null
        
    )
}
const mapStateToProps=state=>{
    return {
        isLoading:state.moneyInfoReducer.isLoading,
        data:state.moneyInfoReducer.data
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        loadMoney:()=>dispatch(addMoneyInfo())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);