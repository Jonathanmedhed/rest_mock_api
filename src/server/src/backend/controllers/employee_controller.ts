import * as express from "express";
import * as joi from "joi";
import { authMiddleware, AuthenticatedRequest } from "../config/auth";
import { getEmployeeRepository } from "../repositories/employee_repository";
import { Employee } from "../entities/employee";
import { Repository } from "typeorm";



interface EmployeesItem {
    id: number;
    email: string;
    companyName: string;
    phoneNumber: string;
    contactName: string;
    emailSent: string;
    deleted: boolean;
}

export function getHandlers(employeeRepo: Repository<Employee>) {

    const getEmployeeByIDHandler = (req: express.Request, res: express.Response) => {
        (async () => {
            const id = req.params.id;
            const employees = await employeeRepo.findOne(id);
            res.json(employees);
        })();
    };

    return {
        getEmployeeByIDHandler: getEmployeeByIDHandler
    };
}

export function getEmployeeController() {

    // Create respository so we can perform database operations
    const employeeRepository = getEmployeeRepository();

    // Create handlers
    const handlers = getHandlers(employeeRepository);

    // Create router instance so we can declare enpoints
    const router = express.Router();


    // HTTP GET http://localhost:8080/employee/
    router.get("/", (req, res) => {
        (async () => {
            const employees = await employeeRepository.createQueryBuilder("employee")
                .getMany() as unknown as EmployeesItem[];
            res.json(employees).send();
        })();
    });

    // HTTP GET  Employee by id http://localhost:8080/Employees/1
    router.get("/:id", (req, res) => {
        (async () => {
            const employeeIdStr = req.params.id as string;
            const employeeIdNbr = parseInt(employeeIdStr);
            if (isNaN(employeeIdNbr)) {
                res.status(400).send({
                    msg: "Id must be a number!"
                });
            } else {
                const employees = await employeeRepository.createQueryBuilder("employee")
                    .where("employee.id = :id", { id: employeeIdNbr })
                    .getOne() as unknown as EmployeesItem;
                if (employees == null) {
                    res.status(404).send({
                        msg: "employee not found!"
                    });
                } else {
                    res.json(employees).send();
                }
            }
        })();
    });


    // HTTP DELETE http://localhost:8080/employees/1
    router.delete("/:id", (req, res) => {
        (async () => {
            const employeeIdStr = req.params.id as string;
            const employeeIdNbr = parseInt(employeeIdStr);
            /** 
            if (isNaN(employeeIdNbr)) {
                res.status(400).send({
                    msg: "Id must be a number!"
                });
            } else {*/
            const employee = await employeeRepository.findOne(employeeIdNbr) as unknown as EmployeesItem;
            const employeeResult = await employeeRepository.find({ id: employeeIdNbr });
            if (employee == undefined) {
                res.status(404).send({
                    msg: "employee not found!"
                });
            } else {
                if (employeeResult.length == 0) {
                    res.status(400).send({
                        msg: "Only owner can delete!"
                    });
                    // }
                }
                const employeeIdStr = req.params.id as string;
                employeeRepository.delete(employeeIdStr);
                res.json(employee).send();
            }
        })();

    });


    // SIMPLE HTTP POST http://localhost:8080/employees/
    router.post("/", (req, res) => {
        (async () => {
            const userId = (req as any).userId;
            const newemployee = req.body;
            //const result = joi.validate(newemployee, employeeSchemaForPost);
            /*
            if (result.error) {
                res.status(400).send({
                    msg: "error!"
                });
            } else {*/
            const employees = await employeeRepository.save(newemployee);
            res.json(employees).send();
            //}
        })();
    });

    // Simple HTTP PATCH http://localhost:8080/employees/1
    router.put("/:id",(req, res) => {
        (async () => {
            const employeeIdStr = req.params.id as string;
            const employeeIdNbr = parseInt(employeeIdStr);
            if (isNaN(employeeIdNbr)) {
                res.status(400).send({
                    msg: "Id must be a number!"
                });
            } else {
                const update = req.body;
                const oldemployee = await employeeRepository.findOne(employeeIdNbr) as any;
                const employeeResult = await employeeRepository.find({ id: employeeIdNbr });
                console.log(employeeResult);
                if (oldemployee == undefined) {
                    res.status(404).send({
                        msg: "employee not found!"
                    });
                } else {
                    if (employeeResult.length == 0) {
                        res.status(400).send({
                            msg: "employee not found :(!"
                        });
                    }
                }

                if (oldemployee) {
                    const key = Object.keys(update)[0];
                    const val = update[key];
                    (oldemployee as any)[key] = val;
                    const updatedemployee = await employeeRepository.save(oldemployee);
                    res.json(updatedemployee).send();
                } else {
                    res.status(404).send({
                        msg: "employee not found!"
                    });
                }
            }
        })();
    });

    return router;
}