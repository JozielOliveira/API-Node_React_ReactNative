import React, { Component } from 'react';

import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  AsyncStorage

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import StackActions from 'react-navigation/src/routers/StackActions';
import NavigationActions from 'react-navigation/src/NavigationActions';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    user: ''
  }

  componentDidMount = async () => {
    const user = await AsyncStorage.getItem('user');
    
    if(user)
      this.navigateToTimeline();
  }

  handleInputChange = user => {
    this.setState({ user });
  }
  
  handleLogin = async () => {
    const { user } = this.state;

    if(!user.length) return;

    this.setState({ user });

    await AsyncStorage.setItem('user', user);

    this.navigateToTimeline();

  }

  navigateToTimeline = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName : 'Timeline' })
      ]
    })
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.content}>
          <View>
            <Icon name='twitter' color='#4BB0EE' size={80} />
          </View>
          <TextInput 
            style={styles.input}
            placeholder='Nome de Usuário'
            value={this.state.user}
            onChangeText={this.handleInputChange}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin} >
            <Text style={styles.buttonText} >Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
