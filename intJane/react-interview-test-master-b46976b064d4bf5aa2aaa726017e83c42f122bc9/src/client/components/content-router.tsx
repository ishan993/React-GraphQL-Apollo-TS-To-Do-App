import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import glamorous from "glamorous";
import ItemList from "./item-list";
import AddItem from "./add-item";
import NoMatch from "./no-match";

const Content = glamorous.div({
  marginTop: 30,
  padding: 10
});

const ContentRouter = () => (
  <Content>
    <Switch>
      <Route path="/" exact={true} component={ItemList} />
      <Route path="/add-item" component={(props: RouteComponentProps<{}>) => (
        <AddItem onSubmitSuccess={() => props.history.push("/")} />
      )} />
      <Route component={NoMatch} />
    </Switch>
  </Content>
);

export default ContentRouter;