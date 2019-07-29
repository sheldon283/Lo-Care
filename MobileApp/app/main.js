import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { 
  AppRegistry, 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

//import GeoLocationExample from './geo.js' 
//uncomment for separate file implementation 

//location
//sending as JSON 
//make new function to connect phone number to function
//add another button

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        latitude: null,
        longitude: null,
        error: null,
        position: null,
        looping: false,
        canSend: false
    };

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { canSend: !previousState.canSend };
      });
    }, 10000);

  }

  componentDidMount() {
    if (1) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            position: position,
          });
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
  }

  postToServer = (timestamp) => {
    var rand = Math.floor(Math.random() * 5) + 1 ;

    fetch('http://131.179.9.25:5500/api/newLoc', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'uniqueid': "Sahil",
        'timestamp': timestamp,
        'latitude': this.state.latitude + (rand*0.0002),
        'longitude': this.state.longitude + (rand*0.0001)
      })
    }).then(function(response) {
      console.log(response.json())
    }).catch(function(err) {
      console.log(err);
    })

    console.log("post req sent");
  }

  onStart = (phone, name) => {
    this.setState({ looping: true }, () => {
     console.log('looping: ', this.state.looping)
    })
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    var text = name + " is in trouble! Visit this link and type in unique id 'Sahil' to see where they are: http://131.179.9.25:5500"

    //SEND TEXT
    var SmsAndroid = require('react-native-sms-android');
    SmsAndroid.sms(
      phone, // phone number to send sms to
      text, // sms body
      'sendDirect', // sendDirect or sendIndirect
      (err, message) => {
        if (err){
          console.log("error");
        } else {
          console.log(message); // callback message
        }
      }
    );
  }


onStop = () => {
  this.setState({ looping: false }, () => {
     console.log('looping: ', this.state.looping)
  })
}

render() {
  const { phone, username } = this.props.navigation.state.params;
  const dateTime = Date.now();
  const timestamp = Math.floor(dateTime / 1000);

  if (this.state.canSend && this.state.looping) 
    this.postToServer(timestamp)

  return (
    <View style={styles.container}>
        <TouchableOpacity
          	style={[styles.startbutton, this.state.looping ? styles.disabled : styles.enabled ]} 
            onPress={ () => this.onStart(phone, username)}>
          	<Text style={styles.starttext}>START</Text>
        </TouchableOpacity>
         <TouchableOpacity
            style={[styles.stopbutton, this.state.looping ? styles.enabled : styles.disabled ]} 
            onPress={ () => this.onStop(phone)}>
            <Text style={styles.stoptext}>STOP</Text>
        </TouchableOpacity>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
    );
  }
}


const styles = StyleSheet.create({
  startbutton: {
    borderWidth:1,
   borderColor:'rgba(0,0,0,0.2)',
   alignItems:'center',
   justifyContent:'center',
   width: 300,
   flex: 1,
   marginTop: 20,
   borderRadius: 20
  },
  stopbutton: {
   borderWidth:1,
   borderColor:'rgba(0,0,0,0.2)',
   alignItems:'center',
   justifyContent:'center',
   width: 300,
   flex: 1,
   marginBottom: 20,
   marginTop: 20,
   borderRadius: 20
  },
  disabled: {
    backgroundColor: 'rgba(134, 141, 153, 0.5)'
  },
  enabled: {
    backgroundColor: '#4286F4'
  },
  starttext: {
  	fontSize: 70,
  	color: 'white'
  },
  stoptext: {
    fontSize: 70,
    color: 'white'
  },
  container: {
  	flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});