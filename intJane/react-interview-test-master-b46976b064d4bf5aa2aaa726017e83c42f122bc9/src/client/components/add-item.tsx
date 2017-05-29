import * as React from "react";
import glamorous from "glamorous";
import { CSSProperties } from "glamorous/typings/css-properties";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { reduxForm, Field, FormProps, WrappedFieldProps } from "redux-form";
import { graphql, InjectedGraphQLProps } from "react-apollo";
import { DataProxy } from "apollo-client/data/proxy";
import { DocumentNode } from "graphql";
import { Item } from "../../shared/types";
import { ItemListQuery, AddItemMutation, AddItemMutationVariables } from "../queries/types";
import Menu from "./menu";
const itemListQuery: DocumentNode = require("../queries/item-list.graphql");
const addItemMutation: DocumentNode = require("../queries/add-item.graphql");

const Container = glamorous.div({
  width: "80%"
});

const Form = glamorous.form({
  display: "flex",
  margin: "auto",
  padding: "10px",
  flexFlow: "column nowrap",
  maxWidth: 400,
  "> *": { margin: "0 0 30px" }
});

const Label = glamorous.label({
  display: "flex",
  flexFlow: "column-reverse",
  "> :first-child": { marginTop: 4 }
});

const sharedInputStyles: CSSProperties = {
  backgroundColor: "#f9f9f9",
  border: "none",
  borderBottom: "2px solid #f9f9f9",
  padding: 6,
  outline: "none",
  transition: "all .2s ease-in",
  ":focus": {
    borderBottom: "2px solid #777",
  },
  fontSize: 14,
  fontWeight: 200
};

const NameInput = glamorous.input(
  sharedInputStyles,
  { height: 24 }
);

const DescInput = glamorous.textarea(
  sharedInputStyles,
  { height: 60 }
);

const ButtonWrapper = glamorous.div({
  width: "100%",
  display: "flex",
  justifyContent: "space-around"
});


const Button = glamorous.button({
  height: 40,
  flexBasis: "40%",
  backgroundColor: "#e9e9e9",
  border: "none",
  outline: "none",
  ":focus": { border: "2px solid #777" },
  ":hover": { border: "2px solid #777" },
  ":active": {
    backgroundColor: "#fff",
    border: "2px solid #c9c9c9"
  }
});

const NameField = ({ input }: WrappedFieldProps<{}>) => (
  <NameInput {...input} />
);

const DescField = ({ input }: WrappedFieldProps<{}>) => (
  <DescInput {...input} />
);
interface AddItemOuterProps {
  onSubmitSuccess(): void;
}

export interface AddItemInnerProps extends
  InjectedGraphQLProps<{}>,
  FormProps<Partial<Item>, undefined, undefined> {
}

const AddItem = ({ handleSubmit, reset }: AddItemInnerProps) => (
  <Container>
    <Menu />
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Field name="name" component={NameField}/>
      </Label>
      <Label>
        Description
        <Field name="description" component={DescField}/>
      </Label>
      <ButtonWrapper>
        <Button type="reset" onClick={reset}>Reset</Button>
        <Button type="submit">Submit</Button>
      </ButtonWrapper>
    </Form>
  </Container>
);

export default compose<AddItemInnerProps, AddItemOuterProps>(
  graphql(addItemMutation),
  reduxForm({
    form: "add-item",
    onSubmit(
      { name, description }: AddItemMutationVariables,
      _: Dispatch<{}>,
      props: { mutate: Function }
    ): Promise<{}> {
      if (!name || !description) throw new Error("Name is required");
      return props.mutate({
        mutation: itemListQuery,
        variables: { name, description },
        update(store: DataProxy, { data: { addItem } }: { data: AddItemMutation }): void {
          const data = store.readQuery({ query: itemListQuery }) as ItemListQuery;
          if (data.items) data.items.push(addItem);
          store.writeQuery({ query: itemListQuery, data });
        }
      });
    }
  })
)(AddItem);