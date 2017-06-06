# react-interview-app

Welcome to the Jane interview test!

This project is not to be shared or posted publicly.  You may of course use any online resources to complete the challenges, but you may not pair with a friend or have someone else complete the test for you.  You will be expected to discuss your code and the decisions you've made in your interview.

---

Listed below are a series of challenges.  They do not need to be completed in any particular order, so if you get stuck on one you should leave your partial solution in a branch and move on.  Don't be afraid of committing frequently.  It will make it easier to follow your work when we review together.  Note the challenge you were working on in each commit.  And no code would be complete without a bug or two.  There is at least one bug lying in wait for you.  You may or may not notice it right away, but eventually it will prevent you from proceeding.

Finally, you may go beyond the challenges listed here, provided it doesn't alter original functionality requested.  This is not required and should only be done after each challenge has at least been attempted.

Don't be afraid to reach out if an instruction is unclear.  Solutions will be graded on the following criterea:
* completeness
* simplicity
* adherence to existing code patterns/style
* adherence to the conventions of the library in question (`react-router`, `react-apollo`, etc)
* innovation (provided it doesn't interfere with simplicity)

Good luck, and have fun!

### Hints

- `npm start` will enter dev mode, watching all files in the `src` folder and reloading both the server and page as necessary.
- Once started, navigate to [http://localhost:3000/](http://localhost:3000/).
- The server is also running a GraphiQL server at [http://localhost:2999/-/graphiql](http://localhost:2999/-/graphiql).
- If you change the server's GraphQL schema (see `schema/schema.graphql`) you will need to run `npm run build-schema-types` to regenerate the TypeScript definitions both the server and client use.


---
## Challenge 1: 404 route

Currently navigating to a bogus path renders nothing.  Add a 404 component and render it when no other routes match.


---
## Challenge 2: "Add Item" reset button

Add a 2nd button to the "Add Item" form.  The button should go on the same row as the existing "Submit" button.  Divide the space in half and put the "Reset" button on the left side.

Clicking the "Reset" button should restore the form to its empty state.


---
## Challenge 3: Item deletion

The server already supports deletion.  Here's an example deletion mutation you can try in GraphiQL:

```graphql
mutation DeleteItem($id: String!) {
  deleteItem(id: $id) {
    id
  }
}
```

Add an "X" to the left end of each row in the item list which removes that item.  The X should match the existing font size, but the clickable area should be a square which covers the height of the row.  It should have a background highlight separate from the row's highlight.


---
## Challenge 4: Add a "detail" view

Each list item should be a link which navigates to a "detail" page for that item.  The clickable area should include the entire highlight area for the row.  The detail page should live at `/items/:id`.  Navigation should work the same way the nav menu works, e.g. the url changes and the browser's back button should work but it does not reload the page.


---
## Challenge 5: Add a "description" field to the items

Description should be required.  You'll probably need to erase the "db" when making this change (delete `build-server/server/items.db`).  "Add Item" should use a `textarea` for description.  The new "detail" view should display the item's description.


---
## Challenge 6: Item editing

Add an "Edit" button to the "detail" view.  This should resemble the "Add Item" form.  The edit form should have a "Cancel" button instead of a "Reset" button which returns to the regular detail page.
