import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';


const SignUp = ({navigation}) => {
    const [accNo, setAccNo] = useState("");
    const [uPassword, setUPassword] = useState("");
    const [uName, setUName] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uPhoneNo, setUPhoneNo] = useState("");
    const [uCity, setUCity] = useState("");
    const [uBalance ,setUBalance] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignItems:'center'}}>
        <Image source={require('../assets/BankLogo.png')} style={{height:70,width:70}}></Image>
        <Text style={styles.headtext}>SignUp</Text>
      </View>
      <Text>________________________________________________</Text>
      <View style={{marginTop:30, marginBottom:40}}>
        <Text style={styles.text}>Enter Account Number:</Text>
        <TextInput placeholder='Enter Account Number...' style={styles.TextInput} onChangeText={(e) =>setAccNo(e)} keyboardType='numeric'></TextInput>
        <Text style={styles.text}>Enter Your Name:</Text>
        <TextInput placeholder='Enter Your Name...' style={styles.TextInput} onChangeText={(e) =>setUName(e)}></TextInput>
        <Text style={styles.text}>Enter Your Email:</Text>
        <TextInput placeholder='Enter Your email...' style={styles.TextInput} onChangeText={(e) =>setUEmail(e)}></TextInput>
        <Text style={styles.text}>Enter Your Mobile Number:</Text>
        <TextInput placeholder='Enter Your mobile number...' style={styles.TextInput} onChangeText={(e) =>setUPhoneNo(e)} keyboardType='numeric'></TextInput>
        <Text style={styles.text}>Enter Your City:</Text>
        <TextInput placeholder='Enter Your City...' style={styles.TextInput} onChangeText={(e) =>setUCity(e)}></TextInput>
        <Text style={styles.text}>Enter Password:</Text>
        <TextInput secureTextEntry={true} placeholder='Enter Your Password...' style={styles.TextInput} onChangeText={(e) =>setUPassword(e)}></TextInput>
        <Text style={styles.text}>Enter Intial Deposit:</Text>
        <TextInput placeholder='Enter Initial Deposit...' style={styles.TextInput} onChangeText={(e) =>setUBalance(e)} keyboardType='numeric'></TextInput>
        <Text style={styles.navtext} onPress={() => navigation.navigate("Login")}>Already have account? Login</Text>
        <TouchableOpacity style={styles.Btn} onPress={() =>Signup(accNo, uName, uEmail, uPhoneNo, uCity, uPassword, uBalance, navigation)}>
          <Text style={{color:'white', fontSize:18, margin:2}}>SignUp</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

const Signup = (accNo, uName, uEmail, uPhoneNo, uCity, uPassword, uBalance, navigation) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if(accNo == '' || uName == '' || uEmail == '' || uPhoneNo == '' || uCity == '' || uPassword == '' || uBalance == ''){
        alert("Please provide all field !!");
    }else if(accNo.length != 4){
        alert("Please provide 4 digit account number !!");
    }else if(reg.test(uEmail) == false){
        alert("Invalid email format !!");
    }else if(uPhoneNo.length != 10){
        alert("Please provide 10 digit mobile number !!")
    }else if(regpass.test(uPassword) === false){
        alert("Password must contain Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 8 characters");
    }else if(uBalance < 500){
        alert("Please deposit minimum 500 rs");
    }else{
        register(accNo, uName, uEmail, uPhoneNo, uCity, uPassword, uBalance, navigation);
    }
}

const register = (accNo, uName, uEmail, uPhoneNo, uCity, uPassword, uBalance, navigation) => {
    axios({
      method: 'POST',
      url: 'http://192.168.1.209:8085/IDFC/Customer/createAcc', 
      data:{
        "acc_no": accNo,
        "cust_name": uName,
        "email": uEmail,
        "password": uPassword,
        "phone_no": uPhoneNo,
        "city": uCity,
        "balance": uBalance,
    }
    }).then(function(response){
        console.log("response",JSON.stringify(response.data));
        alert(JSON.stringify(response.data));
        navigation.navigate("Login");
    }).catch(function(error){
        console.log("error",JSON.stringify(error));
    })
}

export default SignUp

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cafaf5',
      alignItems: 'center',
      paddingTop:40,
    },
    headtext: {fontSize:30, marginVertical:10, marginBottom:40,},
    text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#0D4C92'},
    navtext:{fontSize:15, marginHorizontal:10, marginVertical:2, color:'#0D4C92'},
    TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
    Btn: {height:45, borderWidth:1,borderRadius:7, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginTop:15}
  });