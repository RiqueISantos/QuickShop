import Server from "./server";
import database from "./database";

database.initialize().then(() => {
  Server.start()
}).catch((error) => {
  console.log("Failed to connect to the database:", error)
  process.exit(1)
})