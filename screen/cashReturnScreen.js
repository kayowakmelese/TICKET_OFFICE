import { faArrowRight, faArrowUp, faCamera, faDollarSign, faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity,Image} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import styles from '../style/styles'
import moment from 'moment'
import {connect} from 'react-redux'
import {moneyReturnRequest, setMoneyData} from '../action/index'
import DocumentPicker from 'react-native-document-picker'


const CashReturnScreen=(params)=>{
    const [data,setData]=React.useState([1,1,1,1,1,1,1,1])
    const [image,setImage]=React.useState(null)
    const [money,setMoney]=React.useState(null)
    
    const [swar,setSwar]=React.useState(null)
    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
          const res = await DocumentPicker.pick({
            // Provide which type of file you want user to pick
            type: [DocumentPicker.types.images],
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          // Setting the state to show single file attributes
          setImage(res);
        } catch (err) {
          setImage(null);
          // Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            alert('Canceled');
          } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };
      React.useEffect(()=>{
        if(params.data){
          console.log("ddd",params.data)
          if(params.data.success){
            console.log("i am out")
            params.navigation.goBack();
          }
        }
      },[params.data])
    return (
        <View style={[styles.container,{width:'100%',backgroundColor:'#eee'}]}>
        <TouchableOpacity style={{padding:5,backgroundColor:'orange',borderRadius:5,width:30}}>
        <FontAwesomeIcon icon={faDollarSign} color={'white'} size={20}/>
        </TouchableOpacity>
        
            <Text style={{fontSize:20,fontWeight:'bold'}}>Return Request</Text>
            <Text style={{fontSize:8,color:'gray'}}>cash return request</Text>
            <TextInput  onChangeText={(e)=>{setMoney(e);console.log("moneyis",e)}} keyboardType={'decimal-pad'} placeholder={'Enter return amount'} style={{padding:10,fontSize:10,marginTop:'2%',marginBottom:'1%',width:'100%',backgroundColor:'white',borderRadius:5}}/>
            <TextInput  onChangeText={(e)=>setSwar(e)}  placeholder={'Enter remark or short descripition'} style={{padding:10,fontSize:10,marginVertical:'1%',width:'100%',backgroundColor:'white',borderRadius:5}}/>
            <TouchableOpacity onPress={()=>selectFile()} style={{flexDirection:'row',padding:10,fontSize:10,marginVertical:'1%',width:'100%',backgroundColor:'white',borderRadius:5}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <FontAwesomeIcon icon={faCamera} color={'blue'} size={20}/>
            </View>
            <View style={{padding:5}}>
            <Text style={{fontWeight:'bold'}}>Click to take a photo</Text>
<Text style={{fontSize:8,color:'gray'}}>make sure the receit photo you have taken is well oriented and clearly readable.</Text>
            </View>
          
            </TouchableOpacity>
            {
                image?<Image source={{uri:image[0].uri}} style={{width:'30%',height:100,borderRadius:5}} resizeMethod={'scale'}/>:null
            }

            <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end'}} onPress={()=>{params.sendrequest(money,swar,image);console.log("love",money+swar)}}>
        <View style={{ flexDirection: 'row', backgroundColor: '#0088ff10', borderRadius: 10,borderTopEndRadius:30,borderBottomEndRadius:30 }}>
          
          <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'blue', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20 }}> Finish</Text>
            <FontAwesomeIcon icon={faArrowRight} color={'white'} />
          </View>
        </View>
      </TouchableOpacity>
        </View>
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
        sendrequest:(price,labels,image)=>dispatch(moneyReturnRequest(price,labels,image))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CashReturnScreen);