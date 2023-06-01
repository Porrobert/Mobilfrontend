import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const IP=require("./Ipcim")

export default class Bevitel extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
          osszeg:0,
          kivalasztott:5,
          ujdatum:"2023-02-28"
          
        };
      }




      async lefajta() {
        //fajta lekerdezese
        try {
          const response = await fetch(IP.ipcim+'fajta');
          const json = await response.json();
          console.log(json)
          this.setState({ data: json });
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }
    
      componentDidMount() {
        this.lefajta();
      }
    


felvitel=async ()=>{
    //alert(this.props.akttema)
    try {
      let adatok={
        bevitel1:this.state.kivalasztott,
        bevitel2:this.state.osszeg,
        bevitel3:this.state.ujdatum
        
      }
      const response = await fetch(IP.Ipcim+'felvitel2',
      {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      );
      const szoveg = await response.text();
      alert(szoveg)
     
    } catch (error) {
      console.log(error);
    } finally {
      
    }

}
valfajta=(ertek)=>{
    this.setState({kivalasztott:ertek})
    //alert(ertek)
}

  render() {
    return (
      <View style={{backgroundColor:"lightblue"}}>
       
        <View>
        <Text style={styles.osszeg}>Összeg:</Text>
        <TextInput
        style={{height: 40,border:"black",borderWidth:2,borderRadius:10,padding:10,color:"green", marginLeft: 20,fontSize:15,marginRight:20}}
        onChangeText={(beirtszoveg)=>this.setState({osszeg:beirtszoveg})}
        value={this.state.osszeg}
      />
        <Text style={styles.datum}>Dátum:</Text>
        <TextInput
        style={{height: 40, marginLeft: 40,fontSize:15}}
        onChangeText={(beirtszoveg)=>this.setState({osszeg:beirtszoveg})}
        value={this.state.ujdatum}
      />
          </View>
     
        <Picker 
                style={{backgroundColor:"#82AAE3",color:"black",fontSize:20,marginBottom:20}}
                selectedValue={this.state.kivalasztott}
                onValueChange={(itemValue) => this.valfajta(itemValue) }>
                  {this.state.data.map(item=>

<Picker.Item label={item.fajta_fajta} value={item.fajta_id} />



)}


              </Picker>

              <TouchableOpacity 
              
            onPress={()=>this.felvitel()}
            
            
          >
            <Text
            
            style={styles.gomb}>Felvitel</Text>
          </TouchableOpacity>
       
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gomb:{
    alignSelf:'center',
    textAlign:'center',
    backgroundColor:"#82AAE3",
    height:70,
    fontSize:40,
    marginBottom:20,
    padding: 20,
    fontSize:20

  },
  osszeg:{
    marginLeft: 25,
    fontSize:20,
    marginBottom:20
  },
  datum:{
    marginLeft: 25,
    fontSize:20,
  }
});