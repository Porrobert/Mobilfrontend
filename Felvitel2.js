import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image,ScrollView, TouchableOpacity,TextInput,onChangeText,Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      datafajta:[],
      osszeg:0,
      isLoading: true,
      nev:"",
      ar:"",
      datum:"",
      kiadas_reszletek:"",
      valaszto:1,
      date:new Date(),
      show:false

    };
  }

  async getMovies() {
//kiadas összegzese
try {
  const response = await fetch(IP.ipcim+'osszegzes');
  const json = await response.json();
  console.log(json)
  this.setState({ data2: json });
  this.setState({osszeg:json[0].osszeg})  
} catch (error) {
  console.log(error);
} finally {
  this.setState({ isLoading: false });
}

    //Fajta lekerdezese
    try {
      const response = await fetch(IP.ipcim+'koltsegfajta');
      const json = await response.json();
      console.log(json)
      this.setState({ datafajta: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }




    //kiadas lekerdezese
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


valfajta=(ertek)=>{
  this.setState({valaszto:ertek})
  //alert(ertek)
}

felvitel=async ()=>{
  //alert(this.props.akttema)
  try {
    let adatok={
      bevitel1:this.state.valaszto,
      bevitel2:this.state.ar,
      bevitel3:this.state.date.getFullYear()+"-"+(this.state.date.getMonth()+1)+"-"+this.state.date.getDate(),
      bevitel4:this.state.kiadas_reszletek
    }
    const response = await fetch(IP.ipcim+'felvitel',
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


levag=(datum2)=>{
  let kecske=datum2.split('T')
  return kecske[0]
  }

torles=()=>{
  alert(kiadas_id)
}


/*-------------------------------------------- Datitempicker függvényei */
onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  this.setState({show:false});
  this.setState({date:currentDate});
  

};

showMode = (currentMode) => {
  if (Platform.OS === 'android') {
    this.setState({show:true});
    // for iOS, add a button that closes the picker
  }
  
  
};

showDatepicker = () => {
  this.showMode('date');
};



/*--------------------------------------- Datetimepicker függvényei vége*/

  render() {
    const { data, isLoading } = this.state;


    return (
      <ScrollView style={{ flex: 1, padding: 24 , marginTop:40,backgroundColor:'lightblue'}}>

        <Text  style={{fontSize:20,}}>Összeg:{this.state.osszeg} ft</Text>



        <View style={{backgroundColor:"lightblue"}}>
        <View style={styles.buttonContainer}>

        
        <Text>Ár:</Text>
        <TextInput
        style={{height: 40}}
        placeholder="Írd be az árat!"
        onChangeText={(beirtszoveg)=>this.setState({ar:beirtszoveg})}
        value={this.state.ar}
        />
        
        <Text>Kiadás neve:</Text>
        <TextInput
        style={{height: 40}}
        placeholder="Írd be a kiadás nevét!"
        onChangeText={(beirtszoveg)=>this.setState({kiadas_reszletek:beirtszoveg})}
        value={this.state.kiadas_reszletek}
        />

<Button onPress={this.showDatepicker} title="Dátum" />    
    <Text style={{marginLeft:"auto", marginRight:"auto",
     backgroundColor:"yellow",textAlign:"center", width:200, margin:10,padding:10}}> 
    {this.state.date.getFullYear()+"/"+(this.state.date.getMonth()+1)+"/"+this.state.date.getDate()}
    </Text>
    {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode="date"
          is24Hour={true}
          onChange={this.onChange}
        />
      )}


        <Text>Fajta:</Text> 
          <Picker 
                style={{backgroundColor:"#42adf5",color:"white",marginTop:10, marginBottom:10}}
                selectedValue={this.state.valaszto}
                onValueChange={(itemValue) => this.valfajta(itemValue)
              }>
                  {this.state.datafajta.map(item=>

                <Picker.Item label={item.fajta_nev} value={item.fajta_id} />
          )}

              </Picker>

              <Button
              onPress={()=>this.felvitel()}
               title="Felvitel"
               
          />
              <Button
              onPress={()=>this.torles()}
               title="Törlés"
               
          />






        </View>
       
       
      </View>

        

        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ kiadas_id }, index) => kiadas_id}
            renderItem={({ item }) => (
              <View style={{marginBottom:30}}>

                
              <Text style={{fontSize:30,color:'darkred',textAlign:'center',flex:1}}>
                {item.fajta_nev}
              </Text>

              <Text style={{fontSize:20,color:'green',textAlign:'center'}}>
                {item.kiadas_nev}
              </Text>

              <Text style={{fontSize:20,color:'blue',textAlign:'center'}}>
                {item.kiadas_ar} ft
              </Text>

              <Text style={{fontSize:20,color:'purple',textAlign:'center'}}>
                {this.levag(item.kiadas_datum)}
              </Text>


              <Image source={{uri:item.fajta_kep}}
              style={{width:100,height:100,alignSelf:'center',color:'Red',margin:10}}/>
            <Text style={{borderBottomColor:'black',borderBottomWidth:5}}></Text>
                  
              </View>
            )}
          />
        )}
      </ScrollView>
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