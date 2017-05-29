import * as React from "react";
import glamorous from "glamorous";
import { graphql, InjectedGraphQLProps } from "react-apollo";
import { DocumentNode } from "graphql";
import { ItemListQuery } from "../queries/types";
const itemListQuery: DocumentNode = require("../queries/item-list.graphql");

const ItemContainer = glamorous.div({
  "> *": {
    borderBottom: "1px solid #f2f0f0",
    ":last-child": { borderBottom: "none" }
  }
});

const ItemRow = glamorous.div({
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  height: 40,
  color: "#666",
  textDecoration: "none",
  padding: "0 12px",
  ":focus": { backgroundColor: "#f2f0f0" },
  ":hover": { backgroundColor: "#f2f0f0" }
});

type ItemListProps = InjectedGraphQLProps<ItemListQuery>;

const ItemList = ({ data }: ItemListProps) => (
  <ItemContainer>
    {data && data.items &&
      data.items.map(({ id, name }) => (
        <ItemRow key={id}>
          {name}
        </ItemRow>
      ))
    }
  </ItemContainer>
);

export default graphql(itemListQuery)(ItemList);