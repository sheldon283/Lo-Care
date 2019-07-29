import React, { Component } from 'react';
import { 
  AppRegistry, 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      phone: '',
      email: ''
    };
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello,</Text>
        <Text style={styles.instructions}>Please enter your personal info</Text>

        <TextInput
          style={styles.input}
          placeholder='Name'
          placeholderTextColor='gray'
          underlineColorAndroid={'#4286F4'}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />

        <TextInput
          style={styles.input}
          placeholder='Phone'
          placeholderTextColor='gray'
          underlineColorAndroid={'#4286F4'}
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />

        <TextInput
          style={styles.input}
          placeholder='Email'
          placeholderTextColor='gray'
          underlineColorAndroid={'#4286F4'}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <TouchableOpacity>
          <Text
            style={styles.doneButton}
            onPress={()=>this.props.navigation.navigate("Second", { name: this.state.name})} 
          >Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hello: {
    fontSize: 30,
    color: 'black'
  },
  instructions: {
    fontSize: 15, 
    marginBottom: 20,
    color: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 25
  },
  input: {
    height: 40,
    width: 300,
    color: 'gray'
  },
  doneButton: {
    marginTop: 10,
    color: '#4286F4',
    fontSize: 20,
    padding: 5
  }
});