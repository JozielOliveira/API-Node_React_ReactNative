import React, { Component } from 'react';
import api from '../services/api';


import { Text, TextInput, SafeAreaView, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class New extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    conten : ''
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  handlerNewTweet = async() => {
    const { conten } = this.state;

    if(!conten) return;

    const author = await AsyncStorage.getItem('user');

    await api.post('/tweet', { conten, author })

    this.goBack()
  }

  handlerInputText = conten => {
    this.setState({conten})
  }

  render() {
    return (
      <SafeAreaView style={styles.container }>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name='close' size={24} color='#4BB0EE'/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handlerNewTweet}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity> 
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder='O que está acontecendo? '
          value={this.state.conten}
          onChangeText={this.handlerInputText}
          placeholderTextColor='#999'
          returnKeyType='send'
          onSubmitEditing={this.handlerNewTweet}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});
