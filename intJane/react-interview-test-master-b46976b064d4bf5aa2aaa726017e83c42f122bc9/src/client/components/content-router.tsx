import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import glamorous from "glamorous";
import ItemList from "./item-list";
import AddItem from "./add-item";
import NoMatch from "./no-match";
import DetailedView from "./detailed-view";

const Content = glamorous.div({
  marginTop: 40,
  padding: 10
});

const ContentRouter = () => (
  <Content>
    <Switch>
      <Route path="/" exact={true} component={(props: RouteComponentProps<{}>) => <ItemList />} />
      <Route path="/items/:id" component={(props: RouteComponentProps<{}>) => <DetailedView routeProps={props}/>} />
      <Route path="/add-item" component={(props: RouteComponentProps<{}>) => (
        <AddItem onSubmitSuccess={() => props.history.push("/")} />
      )} />
      <Route component={NoMatch} />
    </Switch>
  </Content>
);

export default ContentRouter;