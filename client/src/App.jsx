import { ApolloProvider } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

// Create an HTTP link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create a context link with an empty headers object
const contextLink = setContext(() => ({ headers: {} }));

// Create the Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([contextLink, httpLink]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
    </ApolloProvider>
  );
}

export default App;