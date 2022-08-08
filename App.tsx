import React, {Component} from "react";
import { MainNav } from "./src/navigation";
import { Provider } from "mobx-react";
import store from "./src/store/MainStore";


export default class App extends Component{
  render(){
      return(
        <Provider store={store}>
       <MainNav />
      </Provider>
      )
  }
}