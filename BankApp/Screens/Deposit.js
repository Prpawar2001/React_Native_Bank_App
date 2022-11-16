import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const Deposit = ({navigation, route}) => {
    const  accNo = route.params.accNo;
    const  uName = route.params.uName;
    const [amount, setAmount] = useState("");

    const deposit = (accNo) => {
        axios({
            method: 'POST',
            url: 'http://192.168.1.209:8085/IDFC/Customer/deposit/' + accNo +"/"+ amount, 
        }).then(function(response){
            alert(JSON.stringify(response.data));
            setAmount("");
            navigation.navigate("Home",{uName});
        }).catch(function(error){
            console.log("error", error);
        })
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
            <View style={{marginTop:30, marginBottom:40}}>
                <Text style={styles.text}>Enter Deposit Amount :</Text>
                <TextInput placeholder='Enter Amount...' value={amount} style={styles.TextInput} onChangeText={(e) => setAmount(e)} keyboardType='numeric'></TextInput>
                <TouchableOpacity style={styles.Btn} onPress={() => deposit(accNo)}>
                    <Text style={{color:'white', fontSize:18, margin:2}}>Deposit</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default Deposit

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
        Btn: {height:45, borderWidth:1, borderRadius:7, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginVertical:14},
})