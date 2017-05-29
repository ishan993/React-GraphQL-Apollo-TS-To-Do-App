import * as React from "react";
import glamorous from "glamorous";
import { graphql } from "react-apollo";
import { DocumentNode } from "graphql";


const itemQuery: DocumentNode = require("../queries/item-query.graphql");


const Wrapper = glamorous.div({
    width: "100%"
});

const DetailedView = ( { data, routeProps }: any) => {

    if (data.loading) {
        return(
            <h4>Loading...</h4>
        );
    }

    return(
        <Wrapper>
            <h1>{data.item.name}</h1>
        </Wrapper>
    );
};

export default graphql(itemQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.routeProps.match.params.id
    }
  })
})(DetailedView);

