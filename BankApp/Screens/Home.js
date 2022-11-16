import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Deposit from './Deposit';

const Home = ({navigation, route}) => {
  const [accNo, setAccNo] = useState(route.params.accNo);
  const uName = route.params.uName ;
  const [uBalance ,setUBalance] = useState("");

  const balance = (accNo) => {
    axios({
      method:'GET',
      url: 'http://192.168.1.209:8085/IDFC/Customer/viewBalance/'+accNo,
    }).then(function(response){
      setUBalance((JSON.stringify(response.data)));
    }).catch(function(error){
      console.log("error",error);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headview}>
        <View style={{flexDirection: 'row',}}>
          <Image source={require('../assets/BankLogo.png')} style={{height:70,width:70,tintColor:'white'}}></Image>
          <Text style={styles.headtext}>MoneyMoney</Text>
        </View>
        <Text style={[styles.userDetails,{fontSize:25}]}>Welcome ! {uName}</Text>
        <Text style={styles.userDetails}>{uBalance}</Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.textHome,{marginTop:30}]}>Select Operation to perform</Text>
        <View style={{marginTop:30}}>
          <TouchableOpacity style={styles.Btn} onPress={() => balance(accNo)}>
            <Text style={{color:'white', fontSize:18, margin:2}}>View Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("Deposit",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Deposit Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("Withdraw",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Withdraw Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("Transfer",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Transfer Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("History",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Transaction History</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

export default Home

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
  TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
  Btn: {height:45, borderWidth:1, borderRadius:7, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginVertical:14}
})
