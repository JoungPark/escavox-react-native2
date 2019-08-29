import axios from 'axios';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  constructor(props){        
     super(props);        
     this.state={
        email:'',
        password: '',
        isLoading: false,
        rememberme: false,
     }
  }

  componentDidMount = () => {
    this.loadData();
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
    const {email,password} = this.state;

    console.log(this.state.rememberme)
    if (this.state.rememberme) {
      //save data with asyncstorage
      let loginDetails={
          email: email,
          password: password
      };
      AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
    } else {
      AsyncStorage.removeItem('loginDetails');
    }

    this.setState({ isLoading: true });
    axios.get(`http://dev.api.escavox.com/api/users/1.0/Authenticate/${email}/${password}`)
    .then(response => response.data)
    .then(data => {
      console.log(`${data.Name} ${data.UserToken}`);
      this.props.navigation.navigate('Main');
      () => { this.setState({ isLoading: false }); }
    })
    .catch(err => {
      alert(err.response.data.Description);
      () => { this.setState({ isLoading: false }); }
    })
    .finally();
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