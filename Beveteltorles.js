import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';

const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      szo:"",
      dataSource:[]

    }
  }

  torles=(szam)=>{
    alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch(IP.Ipcim + "beveteltorles", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
  
    alert(y)
    fetch(IP.Ipcim +  'bevetel')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });


  });

  }


  componentDidMount(){
    return fetch(IP.ipcim +  'bevetel')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keres=()=>{
    //alert("hello")
    var bemenet={
      bevitel1:this.state.szo
    }

  fetch(IP.ipcim + "keres", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.json())
  .then(y => {
    //alert(JSON.stringify(y))
    this.setState({ dataSource   :  y   })
  }
  );
  }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, padding: 24 , marginTop:40,backgroundColor:'lightblue'}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>

{/*--------------------------------------------------------- Találatok */}       
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"green",fontSize:20,textAlign:"center",backgroundColor:"lightblue"}}   >{item.fajta_fajta}Ft </Text>
          <Text style={{color:"green",fontSize:20,textAlign:"center",backgroundColor:"lightblue"}}   >{item.bevetel_osszeg}Ft </Text>
          
          <TouchableOpacity
        style={styles.kekgomb}
        
        onPress={async ()=>this.torles(item.bevetel_id)}
      >
        <Text style={{color:"red",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({film_id}, index) => film_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"auto",
    marginBottom:"auto"
  }
});