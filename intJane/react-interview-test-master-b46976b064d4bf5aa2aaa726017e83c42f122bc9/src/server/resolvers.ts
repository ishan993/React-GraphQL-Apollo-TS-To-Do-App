import { randomBytes } from "crypto";
import * as fs from "fs";
import { Item } from "../shared/types";

export default (db: string) => {
  if (!fs.existsSync(db)) {
    fs.writeFileSync(db, JSON.stringify([]));
  }

  const items: Item[] = JSON.parse(fs.readFileSync(db, "utf8"));
  const saveItems = () => setImmediate(() => {
    fs.writeFile(db, JSON.stringify(items), (err) => {
      if (err) console.error(err);
    });
  });

  const makeId = () => {
    while (true) {
      const id = randomBytes(3).toString("hex");
      if (!items.find((i) => i.id === id)) {
        return id;
      }
    }
  };

  return {
    Query: {
      items() {
        return items;
      },
      item(_: void, { id }: { id: string }): Item | undefined {
        return items.find((i) => i.id === id);
      }
    },
    Mutation: {
      addItem(_: void, { name, description }: { name: string, description: string }) {
        const id = makeId();
        const item = { id, name, description };
        items.push(item);
        saveItems();
        return item;
      },
      editItem( _:void, {id, name, description}: {id: string, name: string, description: string}){
        const idx = items.findIndex((i) => i.id == id);
        items[idx].name = name;
        items[idx].description = description;
        saveItems();
        return items[idx];
      },
      deleteItem(_: void, { id }: { id: string }) {
        const idx = items.findIndex((i) => i.id === id);
        const [ item ] = items.splice(idx, 1);
        saveItems();
        return item;
      }
    }
  };
};