import InMemoryDB from "./database/InMemoryDB";
import makeServer from "./Server";

const port = 1741;
const server = makeServer(InMemoryDB());

server.listen(port);
