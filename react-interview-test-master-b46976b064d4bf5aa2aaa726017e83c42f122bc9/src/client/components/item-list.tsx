import * as React from "react";
import glamorous from "glamorous";
import { gql, graphql } from "react-apollo";
import { DocumentNode } from "graphql";
import { DataProxy } from "apollo-client/data/proxy";
import { ItemListQuery, DeleteItemMutation } from "../queries/types";
import {compose} from "recompose";
import { Link } from "react-router-dom";


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

//type ItemListProps = InjectedGraphQLProps<ItemListQuery>;

/*interface AddItemOuterProps {
  mutate(variables: Object): void;
}*/

interface item {
  id: string,
  name: string
}
const deleteThisItem = gql`
 mutation DeleteItem($id: String!) {
  deleteItem(id: $id) {
    id
  }
}
`;

const ItemList = ({submit, data, history}: any) => {

  const deleteRow = (id: string) => {
      submit(id);
  }

  return(
    <ItemContainer>
      {data && data.items &&
        data.items.map((data:item) => (
          <ItemRow key={data.id}>
            <button onClick={()=>deleteRow(data.id)}> Click Me</button>
            <Link to={"/add-item"}>
              {data.name}
            </Link>
          </ItemRow>
        ))
      }
    </ItemContainer>
);
};


export default compose(graphql(itemListQuery),
  graphql(deleteThisItem, {
    props({ ownProps, mutate }) {
      console.log("I got thiss:"+JSON.stringify(ownProps));
      return {
        submit(id:string) {
          return mutate({
            variables: { id },
            update(store: DataProxy, { data: { deleteItem }}: { data: DeleteItemMutation }): void{
              console.log("I got the id here 12312:::::::"+ id);
              const data = store.readQuery({ query: itemListQuery }) as ItemListQuery;
              console.log("Mutation result"+JSON.stringify(deleteItem));
              if (data.items){
              for(let i=0; i<data.items.length; i++){
                if(data.items[i].id === id){
                    data.items.splice(i, 1);
                    console.log("Trying to delete+=======>>>>");
                }
              }
            }
            store.writeQuery({ query: itemListQuery, data });
          },
          });
        },
      };
    },}))(ItemList);