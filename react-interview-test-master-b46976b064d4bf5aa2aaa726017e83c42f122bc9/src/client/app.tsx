import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ApolloClient, createNetworkInterface, ApolloProvider } from "react-apollo";
import { reducer as formReducer } from "redux-form";
import glamorous from "glamorous";
import Menu from "./components/menu";
import ContentRouter from "./components/content-router";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "/-/graphql"
  })
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer
  }),
  {},
  compose(
      applyMiddleware(client.middleware()),
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:no-any
      (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined") ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f,
  )
);

const Container = glamorous.div({
  margin: "auto",
  maxWidth: 800,
  "@media(max-width: 800px)": { padding: "0 10px" }
});

const App = () => (
  <ApolloProvider store={store} client={client}>
    <BrowserRouter>
      <Container>
        <Menu />
        <ContentRouter />
      </Container>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
