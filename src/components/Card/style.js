import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container:{
    minWidth: 250,
    maxWidth: 370,
    maxHeight: 350,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginLeft: 10,
    elevation: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  scopo:{
    fontSize: 15,
    lineHeight: 20,
    maxHeight: 150,
  },
  author:{
    marginTop: 25,
    fontStyle: 'italic',
    fontSize: 13,
  },
  cardActionsShower:{
    alignSelf: "flex-end",
    
  },
  dialog:{
    minWidth: 250,
    maxWidth: 370,
    maxHeight: 350,
  }

});

export default Style;