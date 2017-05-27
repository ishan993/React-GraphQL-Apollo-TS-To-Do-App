//  This file was automatically generated and should not be edited.
/* tslint:disable */

export interface AddItemMutationVariables {
  name: string;
}

export interface AddItemMutation {
  addItem: {
    id: string,
    name: string,
  };
}

export interface ItemListQuery {
  items: Array< {
    id: string,
    name: string,
  } > | null;
}
/* tslint:enable */
