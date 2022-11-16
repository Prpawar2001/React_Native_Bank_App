import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const ForgotPass = ({navigation}) => {
    const [accNo, setAccNo] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [ uPassword, setUPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Image source={require('../assets/BankLogo.png')} style={{height:70,width:70}}></Image>
        <Text style={styles.headtext}>Update Password</Text>
      </View>
      <Text>________________________________________________</Text>
      <View style={{marginTop:30, marginBottom:40}}>
        <Text style={styles.text}>Enter Account Number:</Text>
        <TextInput placeholder='Enter Account Number...' style={styles.TextInput} onChangeText={(e) =>setAccNo(e)}></TextInput>
        <Text style={styles.text}>Enter Your Email:</Text>
        <TextInput placeholder='Enter Your email...' style={styles.TextInput} onChangeText={(e) =>setUEmail(e)}></TextInput>
        <Text style={styles.text}>Enter Password:</Text>
        <TextInput secureTextEntry={true} placeholder='Enter Your Password...' style={styles.TextInput} onChangeText={(e) =>setUPassword(e)}></TextInput>
        <Text style={styles.navtext} onPress={() => navigation.navigate("Login")}>back to Login</Text>
        <TouchableOpacity style={styles.Btn} onPress={() =>updatePass(accNo, uPassword, uEmail)}>
          <Text style={{color:'white', fontSize:18, margin:2}}>Update</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const updatePass = (accNo, uPassword, uEmail) => {
    const regpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if(accNo == "" || uPassword == "" || uEmail == ""){
        alert("Please provide all fields !!");
    }else if(regpass.test(uPassword) === false){
      alert("Password must contain Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 8 characters");
    }else{
        axios({
            method:'POST',
            url: 'http://192.168.1.209:8085/IDFC/Customer/updatePassword/' + accNo + '/' + uEmail + '/' + uPassword,
        }).then(function(response){
            console.log("response", JSON.stringify(response.data));
            alert( JSON.stringify(response.data));
        })
    }
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cafaf5',
      alignItems: 'center',
      paddingVertical:40,
    },
    headtext: {fontSize:30, marginVertical:10, marginBottom:40,},
    text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#0D4C92'},
    navtext:{fontSize:15, marginHorizontal:10, marginVertical:2, color:'#0D4C92'},
    TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
    Btn: {height:45, borderWidth:1, borderRadius:7, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginTop:15}
  });