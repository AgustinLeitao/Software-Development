import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

//components
import GetBooks from './components/GetBooks'
import AddBook from './components/AddBook'

//apolo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>      
        <GetBooks/>
        <AddBook/>
      </div> 
    </ApolloProvider>  
  );
}

export default App;