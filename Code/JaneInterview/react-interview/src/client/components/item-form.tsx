import * as React from "react";
import { Field, FormProps, WrappedFieldProps } from "redux-form";
import { CSSProperties } from "glamorous/typings/css-properties";
import glamorous from "glamorous";
import { Item } from "../../shared/types";


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

const ItemForm = ( {handleSubmit, reset }: FormProps<Partial<Item>, undefined, undefined> ) => {
    return(
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
    );
}

export default ItemForm;