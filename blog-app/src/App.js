import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Home from './container/Home/Home';
import AddPost from './container/AddPost/AddPost';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/addPost" component={AddPost} />
          {/* <Route path="/signup" render={() => <h1>Route Page</h1>} /> */}
          <Route path="/" exact component={Home}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
