import * as React from "react";
import glamorous from "glamorous";
import { graphql } from "react-apollo";
import { DataProxy } from "apollo-client/data/proxy";
import { Link } from "react-router-dom";
import { DocumentNode } from "graphql";
import { ItemListQuery, DeleteItemMutation } from "../queries/types";
import { compose } from "recompose";
import Menu from "./menu";

const itemListQuery: DocumentNode = require("../queries/item-list.graphql");
const deleteItemQuery: DocumentNode = require("../queries/delete-item.graphql");

const ItemContainer = glamorous.div({
  padding: "10px",
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
  ":focus": { backgroundColor: "#f2f0f0" },
  ":hover": { backgroundColor: "#f2f0f0" }
});

const CloseButton = glamorous.button({
  height: "100%",
  width: "auto",
  border: "none",
  padding: "0 15px",
  fontWeight: 100,
  background: "none",
  color: "darkgrey",
  outline: "none",
  marginRight: "5px",
  ":hover": {background: "#E8E8E8"}
});

const ItemLink = glamorous(Link)({
  width: "100%",
  background: "seafoamgreen",
  textDecoration: "none"
});

export interface PassedProps {
  deleteItem: Function;
  data: {
    items: ItemProps[]
  };
}

interface ItemProps {
  id: string;
  name: string;
}

const ItemList = ({ data, deleteItem}: PassedProps) => {

  const handleDeleteItem = (id: string) => {
    console.log("Tried to delete item!");
    deleteItem(id);
  };

  return(
    <div>
      <Menu />
      <ItemContainer>
        {data && data.items &&
          data.items.map(({ id, name }: ItemProps) => (
            <ItemRow key={id}>
              <CloseButton onClick={() => handleDeleteItem(id)}>X</CloseButton>
              <ItemLink to={"/items/" + id}>
                {name}
              </ItemLink>
            </ItemRow>
          ))
        }
      </ItemContainer>
    </div>
  );
};

export default compose(graphql(itemListQuery),
  graphql(deleteItemQuery, {
    props({ ownProps, mutate }) {
      return {
        deleteItem(id: string) {
          return mutate({
            variables: { id },
            update(store: DataProxy, { data: { deleteItem } }: { data: DeleteItemMutation } ): void {
              const data = store.readQuery({ query: itemListQuery }) as ItemListQuery;
              if (data.items) {
                for (let i = 0; i < data.items.length; i++) { 
                  if ( data.items[i].id === id ) {
                      data.items.splice(i, 1);
                  }
                }
              }
              store.writeQuery({ query: itemListQuery, data });
            },
          });
        },
      };
    }, }))(ItemList);