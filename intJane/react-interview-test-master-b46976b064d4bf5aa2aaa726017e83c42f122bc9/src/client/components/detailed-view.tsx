import * as React from "react";
import glamorous from "glamorous";
import { graphql } from "react-apollo";
import { DocumentNode } from "graphql";


const itemQuery: DocumentNode = require("../queries/item-query.graphql");


const Wrapper = glamorous.div({
    width: "100%"
});

const TitleText = glamorous.h1({
    fontWeight: 200
});

const BodyText = glamorous.h4({
    fontWeight: 200
});

const DetailedView = ( { data, routeProps }: any) => {

    if (data.loading) {
        return(
            <h4>Loading...</h4>
        );
    }

    return(
        <Wrapper>
            {console.log("I got this data: " + JSON.stringify(data))}
            <TitleText>{data.item.name}</TitleText>
            <BodyText>{data.item.description}</BodyText>
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

