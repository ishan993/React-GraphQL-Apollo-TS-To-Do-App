import * as React from "react";
import glamorous from "glamorous";
import { gql, graphql } from "react-apollo";
import { DocumentNode } from "graphql";
//import { ItemListQuery } from "../queries/types";
import {compose} from "recompose";
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
const deleteThisItem = gql`
 mutation DeleteItem($id: String!) {
  deleteItem(id: $id) {
    id
  }
}
`;
export interface DeleteItemMutation {
  name: string;
}

const ItemList = (props: any) => {

  const sayHi = ()=>{
    console.log("FucketyFuckFuck"+JSON.stringify(props));
    props.mutate({
      variables: { id: "1234" }
    }).then(({name}:DeleteItemMutation)=>{
      console.log("Here's the data back:"+JSON.stringify(name));
    }).catch(({message}:Error)=>{
      console.log("I got this error Message"+message);
    });
  }
return(
    <ItemContainer>
      {props.data && props.data.items &&
        props.data.items.map((dats:any) => (
          <ItemRow key={dats.id} onClick={sayHi}>
            {dats.name}
          </ItemRow>
        ))
      }
    </ItemContainer>
);
};

export default compose(graphql(itemListQuery),
                        graphql(deleteThisItem))(ItemList);