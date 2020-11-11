import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  matter:{
    fontSize: 20,
    textAlign: "center"
  },
  title:{
    fontSize: 30,
    textAlign:"center",
    marginTop: 10
  },
  scopo:{
    fontSize: 25,
    marginTop: 10,
    
  },
  author:{
   marginTop: 15,
   height: 50,
   fontWeight: 'bold'
  },
  lineBreak:{
    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
    elevation: 10,
    marginVertical: 15
  }
 
});

export default Style;