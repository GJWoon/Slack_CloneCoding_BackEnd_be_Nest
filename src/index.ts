import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");

}).catch(error => console.log(error));
