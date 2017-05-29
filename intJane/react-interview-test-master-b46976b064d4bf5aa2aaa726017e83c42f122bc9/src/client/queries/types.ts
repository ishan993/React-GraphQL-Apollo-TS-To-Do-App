//  This file was automatically generated and should not be edited.
/* tslint:disable */

export interface AddItemMutationVariables {
  name: string;
  description: string;
}

export interface AddItemMutation {
  addItem: {
    id: string,
    name: string,
    description: string,
  };
}

export interface DeleteItemMutationVariables {
  id: string;
}

export interface DeleteItemMutation {
  deleteItem: {
    id: string,
  };
}

export interface ItemListQuery {
  items: Array< {
    id: string,
    name: string,
    description: string,
  } > | null;
}

export interface ItemQueryQueryVariables {
  id: string;
}

export interface ItemQueryQuery {
  item: {
    name: string,
  } | null;
}
/* tslint:enable */
