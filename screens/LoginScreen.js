import * as React from 'react';
import axios from 'axios';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props){        
     super(props);        
     this.state={
        email:'',
        password: ''
     }
  }

  saveData =async()=>{
    const {email,password} = this.state;

    //save data with asyncstorage
    let loginDetails={
        email: email,
        password: password
    }

    // alert(email);

    axios.get(`http://dev.api.escavox.com/api/users/1.0/Authenticate/${email}/${password}`)
    .then(response => response.data)
    .then(data => {
    //   alert(data.Name + ' ' + data.UserToken);
      this.props.navigation.navigate('Main');
    })
    .catch(err => {
      alert('error');
    });
  }
  showData = async()=>{
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    let ld = JSON.parse(loginDetails);
    alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Welcome! EscaVox
        </Text>
        <TextInput style={styles.inputBox}
        onChangeText={(email) => this.setState({email})}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Email"
        placeholderTextColor = "#002f6c"
        selectionColor="#fff"
        keyboardType="email-address"
        onSubmitEditing={()=> this.password.focus()}/>
                
        <TextInput style={styles.inputBox}
        onChangeText={(password) => this.setState({password})} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor = "#002f6c"
        ref={(input) => this.password = input}/>

        <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputBox: {
      width: 300,
      backgroundColor: '#eeeeee', 
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#002f6c',
      marginVertical: 10
  },
  button: {
      width: 300,
      backgroundColor: '#4f83cc',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
});