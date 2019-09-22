import { getConnection } from "typeorm";
import { Employee } from "../entities/employee";

export function getEmployeeRepository() {
    const connection = getConnection();
    const employeeRepository = connection.getRepository(Employee);
    return employeeRepository;
}