import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList,} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const History = ({navigation,route}) => {
    const  accNo = route.params.accNo;
    const  uName = route.params.uName;
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadhistory();
    }, []);

    const loadhistory = async () => {
        const response = await axios.get("http://192.168.1.209:8085/IDFC/Customer/history/" + accNo);
        console.log(response.data);
        setTransactions(response.data);
    }

  return (
    <View style={[styles.container,{alignItems:'center'}]}>
        <View style={styles.headview}>
            <View style={{flexDirection: 'row',}}>
                <Image source={require('../assets/BankLogo.png')} style={{height:70,width:70,tintColor:'white'}}></Image>
                <Text style={styles.headtext}>MoneyMoney</Text>
            </View>
            <Text style={[styles.userDetails,{fontSize:25}]}>Welcome ! {uName}</Text>
        </View>
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:30}}>
                <Text style={[styles.tbcell,{backgroundColor:'#0D4C92',color:'white'}]}>Sender</Text>
                <Text style={[styles.tbcell,{backgroundColor:'#0D4C92',color:'white'}]}>Receiver</Text>
                <Text style={[styles.tbcell,{backgroundColor:'#0D4C92',color:'white'}]}>Amount</Text>
                <Text style={[styles.tbcell,{backgroundColor:'#0D4C92',color:'white'}]}>Type</Text>
            </View>  
            <FlatList data={transactions} renderItem={(e) => {
                return  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Text style={styles.tbcell}>{e.item.acc_no}</Text>
                            <Text style={styles.tbcell}>{e.item.receiverAcc_no}</Text>
                            <Text style={styles.tbcell}>{e.item.amount}</Text>
                            <Text style={styles.tbcell}>{e.item.type}</Text>
                        </View>
            }} />  
        </View>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cafaf5',
        paddingHorizontal:5
      },
      userDetails: {color:'white', fontSize:20, marginVertical:3},
        textHome: {color:'#0D4C92', fontSize:20, marginVertical:3},
        headview:{backgroundColor:'#0D4C92',marginTop:45, paddingTop:40, paddingHorizontal:20, paddingBottom:30,borderRadius:30, borderBottomRightRadius:80,},
        headtext: {fontSize:40, marginVertical:10,marginHorizontal:20, marginBottom:40,color:'white'},
        text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#0D4C92'},
        navtext:{fontSize:15, marginHorizontal:10, marginVertical:2, color:'#0D4C92'},
        tbcell:{borderWidth:1, borderRadius:1, width:80,height:30, paddingLeft:20, paddingTop:5,borderRadius:5, backgroundColor:'white'},
        TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
        Btn: {height:45, borderWidth:1, borderRadius:7, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginVertical:14},
})