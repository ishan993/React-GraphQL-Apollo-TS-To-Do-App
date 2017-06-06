import * as React from "react";
import { compose } from "recompose";
import { Dispatch } from "redux";
import glamorous from "glamorous";
import { reduxForm, Field, FormProps, } from "redux-form";
import { graphql, InjectedGraphQLProps } from "react-apollo";
import { DataProxy } from "apollo-client/data/proxy";
import { DocumentNode } from "graphql";
import { Item } from "../../shared/types";
import { ItemListQuery, EditItemMutation } from "../queries/types";
import { RouteComponentProps, Link } from "react-router-dom"; 
import { Form, NameField, DescField, Label, Button, ButtonWrapper } from "./add-item";

const itemQuery: DocumentNode = require("../queries/item-query.graphql");
const itemListQuery: DocumentNode = require("../queries/item-list.graphql");
const editItem: DocumentNode = require("../queries/edit-item.graphql");

const Container = glamorous.div({
    width: "80%"
});

const CancelButton = glamorous(Link)({
  flexBasis: "40%",
  background: "#e9e9e9",
  textTransform: "none",
  textDecoration: "none",
  color: "black",
  alignContent: "center",
  ":hover": { border: "1px solid #f2f0f0" }
});

interface AddItemOuterProps {
  onSubmitSuccess(): void;
  onCancel(): void;
  routeProps: RouteComponentProps<{}>;
}

export interface AddItemInnerProps extends
  InjectedGraphQLProps<{}>,
  FormProps<Partial<Item>, undefined, undefined> {
}

const EditItem = ( props: AddItemInnerProps) => {
  return(
    <Container>
      <h1> Edit Item </h1>
      <Form onSubmit={props.handleSubmit}>
        <Label>
          Name
          <Field name="name" component={NameField}/>
        </Label>
        <Label>
          Description
          <Field name="description" component={DescField}/>
        </Label>
        <ButtonWrapper>
          <CancelButton to={"/"}>
            <Label>
              Cancel
            </Label>
          </CancelButton>
          <Button type="submit">Submit</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}


export default compose<AddItemInnerProps, AddItemOuterProps>(
  graphql(editItem),
  graphql(itemQuery, {
    options: ({routeProps}) => ({
      variables: {
        id: routeProps.match.params.id
      }
    }),
    props:({ data: { loading, item } }) => ({
      initialValues: item
    }),
  }),
  reduxForm({
    form: "edit-item",
    onSubmit(
      { id, name, description, data }: any,
      _: Dispatch<{}>,
      props: { mutate: Function }
    ): Promise<{}> {
      if (!name || !description) throw new Error("Name is required");
      return props.mutate({
        mutation: itemListQuery,
        variables: { id, name, description },
        update(store: DataProxy, { data: { editItem } }: { data: EditItemMutation }): void {
          const data = store.readQuery({ query: itemListQuery }) as ItemListQuery;
          if (data.items){
            const idx = data.items.findIndex((i) => i.id === editItem.id);
            data.items[idx] = editItem;
          }
          store.writeQuery({ query: itemListQuery, data });
        }
      });
    }
  })
)(EditItem);