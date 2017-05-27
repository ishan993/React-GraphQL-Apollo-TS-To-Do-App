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
      addItem(_: void, { name }: { name: string }) {
        const id = makeId();
        const item = { id, name };
        saveItems();
        return item;
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