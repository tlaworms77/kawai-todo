import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false
  };

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos } = this.state;

    if(!loadedToDos) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"} 
            value={newToDo} 
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"} 
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm a To Do"}/>
          </ScrollView>
        </View>
      </View>
    );
  }

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
    // justifyContent: 'center' // 원치 않는다 위로 올라가야하기 때문이다.
  },
  title: {
    color: "white", // fontColor
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1, // 높이는 0으로 설정. 위 아래로 움직이는게 싫기 때문 그래서 -1로 설정.
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })

  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
