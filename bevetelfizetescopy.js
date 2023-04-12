import React, { Component, useState }  from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Button, TouchableOpacity, Modal, TextInput } from 'react-native';
const IP= require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      osszeg:0,
      isLoading: true
    };
  }
  
  async getData() {
    try {
      const response = await fetch(IP.ipcim+'bevetelfizetes');
      const json = await response.json();
      console.log(json)
      this.setState({ data2: json });
      this.setState({osszeg:json[0].osszeg})  
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }


  }
  componentDidMount() {
    this.getData();
  }
  
  osszeg=()=>{

  }

  render() {
    const { data, isLoading } = this.state;
  
    return (
      <View style={{ flex: 1, padding: 24 , marginTop:40,backgroundColor:'lightblue'}}>

        <Text style={{fontSize:40,color:'black',textAlign:'center'}}>
               Összes bevétel fizetésből:
              </Text>


              {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ fajta_id }, index) => fajta_id}
            renderItem={({ item }) => (

              <View style={{marginBottom:30}}>
              <Text style={{fontSize:30,color:'green',textAlign:'center'}}>
                {this.state.osszeg} Ft
              </Text>
              <Text  style={{fontSize:30,color:"green"}}>Összeg:{this.state.osszeg} ft</Text>
              <View style={styles.centeredView}> 
              </View>
              </View>
              )}      
              />
              )}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


