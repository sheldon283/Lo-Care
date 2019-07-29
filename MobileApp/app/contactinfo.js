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

export default class ContactsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name1: '',
      phone1: '',
      email1: '',
      name2: '',
      phone2: '',
      email2: ''
    };
  }

  render() {
    const { name } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Thanks, {name}!</Text>
        <Text style={styles.instructions}>Now, enter your emergency contact info</Text>

        <View style={styles.contactView}>
          <Text style={styles.contactText}>Contact #1</Text>
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor='gray'
            underlineColorAndroid={'#4286F4'}
            onChangeText={(name1) => this.setState({name1})}
            value={this.state.name1}
          />

          <TextInput
            style={styles.input}
            placeholder='Phone'
            placeholderTextColor='gray'
            underlineColorAndroid={'#4286F4'}
            onChangeText={(phone1) => this.setState({phone1})}
            value={this.state.phone1}
          />

          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='gray'
            underlineColorAndroid={'#4286F4'}
            onChangeText={(email1) => this.setState({email1})}
            value={this.state.email1}
          />
        </View>

        <View style={styles.contactView}>
          <Text style={styles.contactText}>Contact #2</Text>
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor='gray'
            underlineColorAndroid={'#4286F4'}
            onChangeText={(name2) => this.setState({name2})}
            value={this.state.name2}
          />

          <TextInput
            style={styles.input}
            placeholder='Phone'
            placeholderTextColor='gray'
            underlineColorAndroid={'#4286F4'}
            onChangeText={(phone2) => this.setState({phone2})}
            value={this.state.phone2}
          />

          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='gray'
            underlineColorAndroid={'#4286F4'}
            onChangeText={(email2) => this.setState({email2})}
            value={this.state.email2}
          />
        </View>

        <TouchableOpacity>
          <Text
            style={styles.doneButton}
            onPress={()=>this.props.navigation.navigate("Main", { phone: this.state.phone1, username: name})} 
          >Done
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
  contactView: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20
  },
  contactText: {
    color: 'black',
    fontSize: 20
  },
  input: {
    height: 40,
    width: 300,
    color: 'gray'
  },
  doneButton: {
    color: '#4286F4',
    fontSize: 20,
    padding: 5
  }
});