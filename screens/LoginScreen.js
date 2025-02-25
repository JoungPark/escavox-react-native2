import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import * as actions from '../actions';

class LoginScreen extends React.Component {
  constructor(props){        
     super(props);        
     this.state={
        email:'',
        password: '',
        isLoading: false,
        rememberme: false,
     }
  }

  componentDidMount = async() => {
    await this.loadData();
  }

  loadData = async()=>{
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    if (loginDetails) {
      let ld = JSON.parse(loginDetails);
      this.setState({ rememberme: true, email: ld.email, password: ld.password });
    } else {
      this.setState({ rememberme: false });
    }
  }

  submit = async()=>{
    const { email,password } = this.state;

    if (this.state.rememberme) {
      AsyncStorage.setItem('loginDetails', JSON.stringify({ email, password }));
    } else {
      AsyncStorage.removeItem('loginDetails');
    }

    this.setState({ isLoading: true });

    const { Actions } = this.props;
    try {
      const data = await Actions.signIn(email, password);

      this.registerForPushNotifications(data);
      this.setState({ isLoading: false });
      
      this.props.navigation.navigate('PowerBI');
    } catch(error) {
      let message = 'Undefined error occured.';
      if (error.response.data.Description) message = error.response.data.Description;
      alert(message);
      this.setState({ isLoading: false });
    }
  }

  // Save the user's expo push token on the server
  registerForPushNotifications = async(data) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    
    // Register device push notification token
    axios.post(`${Constants.manifest.extra.apiUrl}/api/users/1.0/RegisterNotificationToken`,
      {
        Email: data.Email,
        Token: token
      }, 
      {
        headers: {
          'SecurityToken': data.Token,
          'UserToken': data.UserToken,
          'Access-Control-Allow-Origin': 'true',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    .then(function (response) {
      
    })
    .catch(function (error) {
      alert(error.response.data.Description);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          (this.state.isLoading)? <ActivityIndicator size="large" color="#0000ff" />: null
        }
        <Text style={styles.paragraph}>
          Welcome! EscaVox
        </Text>
        <TextInput style={styles.inputBox}
        value={this.state.email}
        onChangeText={(email) => this.setState({email})}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Email"
        placeholderTextColor = "#002f6c"
        selectionColor="#fff"
        keyboardType="email-address"
        onSubmitEditing={()=> this.password.focus()}/>
                
        <TextInput style={styles.inputBox}
        value={this.state.password}
        onChangeText={(password) => this.setState({password})} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor = "#002f6c"
        ref={(input) => this.password = input}/>

        <CheckBox title='Remember me' checked={this.state.rememberme} onPress={() => this.setState({rememberme: !this.state.rememberme})}/>

        <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.submit}>{this.props.type}Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    Actions: bindActionCreators(actions, dispatch)
  })
)(LoginScreen);

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