import express from "express";
import bodyParser from "body-parser";
import * as path from "path";
import { createDbConnection } from "./db";
import { getEmployeeController } from "../controllers/employee_controller";
import { Connection } from "typeorm";

export async function createApp(conn?: Connection) {

    // Create db connection if a connection is not passed
    if (conn === undefined) {
        conn = await createDbConnection();
    }

    // Creates app
    const app = express();

    // Server config to be able to send JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Declare main path
    app.use(express.static('public'));

    // Declare controller instances
    const employeeController = getEmployeeController();

    // Declare routes
    app.use("/api/v1/employees", employeeController);

    return app;
}
