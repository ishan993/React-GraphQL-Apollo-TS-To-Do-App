import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import glamorous from "glamorous";
import ItemList from "./item-list";
import AddItem from "./add-item";

const Content = glamorous.div({
  marginTop: 30,
  padding: 10
});

const ContentRouter = () => (
  <Content>
    <Route path="/" exact={true} component={ItemList} />
    <Route path="/add-item" component={(props: RouteComponentProps<{}>) => (
      <AddItem onSubmitSuccess={() => props.history.push("/")} />
    )} />
  </Content>
);

export default ContentRouter;