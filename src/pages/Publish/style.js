import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container:{
    padding: 5
  },
  matterPicker:{
    borderColor:'#777', 
    borderWidth: 1, 
    borderRadius: 25, 
    marginBottom: 10
  },
  titleInput:{
    marginBottom: 20,
    height: 50
  },
  contentInput:{
    marginBottom: 10,
    minHeight: 50,
    maxHeight: 450
  }
});

export default Style;