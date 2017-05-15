import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as express from "express";
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import makeResolvers from "./resolvers";

const serverDir = path.join(__dirname, "../../build-server");
const staticDir = path.join(__dirname, "../../build");

mkdirp.sync(serverDir);
mkdirp.sync(staticDir);

const schemaPath = path.join(__dirname, "../../schema", "schema.graphql");
const dbPath = path.join(serverDir, "items.db");
const htmlPath = path.join(staticDir, "index.html");

const Schema = fs.readFileSync(schemaPath, "utf8");
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: makeResolvers(dbPath)
});

if (!fs.existsSync(htmlPath)) {
  fs.writeFileSync(htmlPath, "");
}

const html = fs.readFileSync(htmlPath);
const app = express();

app.use(express.static(path.join(__dirname, "../../build")));

app.use("/-/graphql", bodyParser.json(), graphqlExpress({ schema: executableSchema }));
app.use("/-/graphiql", graphiqlExpress({ endpointURL: "/-/graphql" }));

app.get("/*", function (req: express.Request, res: express.Response) {
  res.status(200);
  res.type("text/html");
  res.send(html);
});

app.listen(process.env.PORT || 2999);