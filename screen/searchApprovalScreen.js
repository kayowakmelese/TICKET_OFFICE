import { faCog, faEdit, faInfo,faArrowRight, faLanguage, faMoon, faPen, faPeopleCarry, faPhotoVideo, faUser, faWaveSquare, faAt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { searchPassengerData } from '../action'
import styles from '../style/styles'
import strings from '../translation'

const SearchApproval=(props)=>{
    const [search,setSearch]=React.useState(null);
    React.useEffect(()=>console.log(props),[])
    return (
        <View style={[styles.container,{paddingHorizontal:10,backgroundColor:'#eee'}]}>
        
            
           <View style={{marginTop:20,width:'100%'}}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Search</Text>
            <Text style={{fontSize:8,color:'gray'}}>enter the pnr down below to verify transaction</Text>
            <View style={{padding:10,width:'100%'}}>
            <View style={{backgroundColor:'white',width:'100%',borderRadius:5,flexDirection:'row',marginVertical:'1%'}}>
                   
                    <View style={{paddingHorizontal:10,marginVertical:5,padding:10}}>
                        <TextInput onChangeText={(e)=>setSearch(e)} placeholder={'passenger code'}/>
                    </View>
                    <FontAwesomeIcon icon={faSearch} color={'gray'} size={20} style={{alignSelf:'center',justifyContent:'center',position:'absolute',right:10}}/>

            </View>
           
            <View style={{alignItems:'flex-end',marginTop:20}}>

<TouchableOpacity style={{width:'100%',alignItems:'flex-end'}} onPress={()=>{props.searchData(search)}}>

<View style={{flexDirection:'row',padding:15,backgroundColor:'blue',borderRadius:10}}>
<Text style={{color:'white',fontWeight:'bold',marginRight:20}}> Search</Text>
<FontAwesomeIcon icon={faArrowRight} color={'white'} />
</View>
</TouchableOpacity>
</View>
            </View>
            </View>
        </View>
    )
}
const mapStateToProps=(state)=>{
    return {
            phoneNo:state.signedInfoReducer.phoneNumber
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        searchData:(id)=>dispatch(searchPassengerData(id))
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(SearchApproval);