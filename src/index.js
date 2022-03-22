import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './ApolloClient';
import { hydrate, render } from "react-dom";
import App from './App';
import './index.css';

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById( 'root' )
);
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<ApolloProvider client={client}>
	<App />
</ApolloProvider>, rootElement);
} else {
  render(<ApolloProvider client={client}>
	<App />
</ApolloProvider>, rootElement);
}