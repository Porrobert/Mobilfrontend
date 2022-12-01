import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,} from 'react-native';
const IP = require('./Ipcim');



const Flex = () => {
  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "row"
    }]}>
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 1, backgroundColor: "darkorange" }} />
      <View style={{ flex: 1, backgroundColor: "green" }} />
    </View>
  );
};




export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getMovies() {
    try {
      const response = await fetch(IP.ipcim+'kiadas');
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
    this.getMovies();
  }
/*
  szavazat=(szam)=>{
    //alert(szam)
    var adatok={
      bevitel1:szam
    }
    alert(adatok.bevitel1)
    const response = fetch('http://192.168.6.3:3000/szavazat',{
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }

*/
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 , marginTop:40}}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ kiadas_id }, index) => kiadas_id}
            renderItem={({ item }) => (

              <View style={{marginBottom:30}}>
              <Text style={{fontSize:30,color:'darkred',textAlign:'center',flex:1}}>
                {item.fajta_nev}
              </Text>



              




              <Text style={{fontSize:30,color:'darkred',textAlign:'center'}}>
                {item.kiadas_nev}
              </Text>
              <Text style={{fontSize:30,color:'darkred',textAlign:'center'}}>
                {item.kiadas_ar} ft
              </Text>
              <Text style={{fontSize:30,color:'darkred',textAlign:'center'}}>
                {item.kiadas_datum}
              </Text>

              <Image source={require('./kepek/kep1.jpg')} style={{width:100,height:100,alignSelf:'center',color:'Red'}}   />
             {/*----------------------------------------------------------------------}
             <TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.szavazat(item.kiadas_koltsegfajta)}
        >
          <Text style={{color:'white',fontSize:30}}>Költség</Text>
        </TouchableOpacity>
        { */}           
              </View>
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginLeft:30,
    marginRight:30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});