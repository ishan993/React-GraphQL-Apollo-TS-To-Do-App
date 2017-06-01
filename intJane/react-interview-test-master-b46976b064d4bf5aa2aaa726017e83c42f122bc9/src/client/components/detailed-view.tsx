import * as React from "react";
import glamorous from "glamorous";
import { graphql, InjectedGraphQLProps } from "react-apollo";
import { DocumentNode } from "graphql";
import { Link } from "react-router-dom";
import { ItemQueryQuery } from "../queries/types";
import { RouteComponentProps } from "react-router-dom"; 
import NoMatch from "./no-match"

const itemQuery: DocumentNode = require("../queries/item-query.graphql");


const Wrapper = glamorous.div({
    width: "100%"
});

const ButtonWrapper = glamorous.div({
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
});

const EditButton = glamorous(Link)({
    padding: "5px 15px",
    background: "#36c6b1",
    color: "#fff",
    cursor: "pointer",
    borderRadius: 3,
    textDecoration: "none",
    borderStyle: "none",
    borderBottom: "3px solid rgba(0, 0, 0, .08)",
    outline: "none",
    ":hover": {background: "#30b29f"}
})

const TitleText = glamorous.h1({
    fontWeight: 200
});

const BodyText = glamorous.h4({
    fontWeight: 200
});

export interface DetailedViewProps extends
    InjectedGraphQLProps<ItemQueryQuery>{
        routeProps: RouteComponentProps<{}>
    }

const DetailedView = ( props: DetailedViewProps) => {

    const showLoading = () =>{
        if(props.data && props.data.loading){
           return(<h4>Loading...</h4> );
        }
    }

    const showItem = () => {
        if(props.data && props.data.item){
            return(
                <Wrapper>
                    <ButtonWrapper>
                        <EditButton to={"/items/edit/" + props.data.item.id}>Edit</EditButton>
                    </ButtonWrapper>
                    <TitleText>{props.data.item.name}</TitleText>
                    <BodyText>{props.data.item.description}</BodyText>
                </Wrapper>
            );
        }
    }
    const showPageNotFound = () => {
        if(props.data && !props.data.item && !props.data.loading){
            return(<NoMatch/>);
        }
    }
    return(
        <div>
            
            { showLoading() }
            { showItem() }
            { showPageNotFound() }
        </div>
    );
};

export default graphql(itemQuery, { 
    options: ({ routeProps }) =>({
         variables: {id: routeProps.match.params.id} })
        })(DetailedView);
