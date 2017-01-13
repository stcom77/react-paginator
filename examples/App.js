import React, { Component } from 'react';
import Paginator from '../src/index';
// const App = () => <h1><paginator></paginator>Hello</h1>;
class App extends Component {
  render() {
    return <Paginator currentPage={1} onGetPageUrl={()=>{return "#"}} pageCount={100}/>
  }
}

export default App;

