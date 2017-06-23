import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import glamorous from "glamorous";
import ItemList from "./item-list";
import AddItem from "./add-item";
import NoMatch from "./no-match";
import DetailedView from "./detailed-view";
import EditItem from "./edit-item";
import { IdParams } from "../../shared/types";

const Content = glamorous.div({
  marginTop: 40,
  padding: 10
});

const ContentRouter = () => (
  <Content>
    <Switch>
      <Route path="/" component={(props: RouteComponentProps<{}>) => <ItemList />} />
      <Route path="/items/edit/:id" component={(props: RouteComponentProps<IdParams>) => (
        <EditItem routeProps={props} 
            onSubmitSuccess={() => props.history.push("/items/"+props.match.params.id)}
            onCancel={()=>{ props.history.push("/")}}/>
      )} />
      <Route path="/items/:id" component={(props: RouteComponentProps<IdParams>) => (
        <DetailedView routeProps={props}/>)} />
      <Route exact={true} path="/add-item" component={(props: RouteComponentProps<{}>) => (
        <AddItem onSubmitSuccess={() => props.history.push("/")}/>
      )} />
      <Route component={NoMatch} />
    </Switch>
  </Content>
);

export default ContentRouter;