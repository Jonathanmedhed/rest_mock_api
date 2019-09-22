import React from 'react';
import { Dialog } from '../components/dialog/dialog';
import { PopUp } from '../components/popup/popup';



/**
 * dialog form holder
 */
const formHolder: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    fontFamily: `Rubik,Lato,"Lucida Grande","Lucida Sans Unicode",Tahoma,Sans-Serif`,
    fontSize: "10px"
};

/**
 * Style for delete dialogue
 */
const deleteMessage: React.CSSProperties = {
    position: "absolute",
    background: "white",
    padding: "8px 25px",
    color: "black",
    height: "100px",
    width: "150px",
    top: "20px",
    left: "",
    fontSize: "20px",
    //border: "solid",
}

/**
 * Employee Interface
 */
interface EmployeesItem {
    id: number;
    employee_name: string;
    employee_salary: string;
    employee_age: string;
    profile_image: string;
}



/**
 * Component props
 */
interface EmployeesPageProps {
}

/**
 * Component's state
 */
interface EmployeesPageState {
    currentEmployee: EmployeesItem | null;
    addEmployee: boolean | null;
    deleteEmployee: boolean | null;
    editEmployee: boolean | null;
    name: string;
    salary: string;
    age: string;
    picture: string;
    Employees: EmployeesItem[] | null;
    queryEmployee: string;
    changeSalary: boolean | null;
    changeName: boolean | null;
    changeAge: boolean | null;
    changePic: boolean | null;
    message: boolean | null;
    title: string | null;
    messageContent: string | null;
}

/**
 * Component constructor
 */
export class EmployeesPage extends React.Component<EmployeesPageProps, EmployeesPageState> {
    public constructor(props: EmployeesPageProps) {
        super(props);
        this.state = {
            currentEmployee: null,
            addEmployee: false,
            deleteEmployee: false,
            editEmployee: false,
            name: "",
            salary: "",
            age: "",
            picture: "",
            Employees: null,
            queryEmployee: "",
            message: false,
            title: "",
            messageContent: "",
            changeSalary: null,
            changeName: null,
            changeAge: null,
            changePic: null
        };
    }

    /**
     * Get list of employees from server
     */
    public componentDidMount() {
        (async () => {
            const employees = await getEmployees() as EmployeesItem[];
            if (employees) {
                this.setState({ Employees: employees });
            }
        })();
    }

    /**
     * Render component
     */
    public render() {
        if (this.state.Employees === null) {
            return <h1>Loading...</h1>;
        } else {
            return [<h1>
                Employees
                </h1>,

            <div>
                {this._showEmployeeSearchBox()}
                {this._showEmployeeOptions()}
                {this._showAddEmployee()}
                {this._showDeleteEmployee()}
                {this._showMessage()}
                {this._showChangeSalary()}
                {this._showChangeName()}
                {this._showChangeAge()}
                {this._showChangePicture()}
                {this._showEditEmployee()}
            </div>,
            ];

        }
    }

    /**
     * Employee state changes methods
     * 
     */

    /**
     *  Change current Employee to the one selected
     */
    private _selectEmployee(employee: EmployeesItem) {
        if (this.state.currentEmployee) {
            this.setState({ currentEmployee: null });
            this.setState({ editEmployee: false });
            this.setState({ changeSalary: false });
            this.setState({ changeName: false });
        } else if (this.state.currentEmployee) {
            this.setState({ currentEmployee: null });
            this.setState({ editEmployee: false });
            this.setState({ changeSalary: false });
            this.setState({ changeName: false });
        } else {
            this.setState({ currentEmployee: employee });
        }
    }

    /**
     *  Change add employee state to true 
     */
    private _selectAddEmployee(bool: boolean) {
        this.setState({ addEmployee: bool });
    }

    /**
     *  Change delete employee state to true 
     */
    private _selectDeleteEmployee(bool: boolean) {
        this.setState({ deleteEmployee: bool });
    }


    // Update the state (Name) on keyup
    private _updateName(employeeName: string) {
        this.setState({ name: employeeName });
    }
    // Update the state (Salary) on keyup
    private _updateSalary(employeeSalary: string) {
        this.setState({ salary: employeeSalary });
    }

    // Update the state (Age) on keyup
    private _updateAge(employeeAge: string) {
        this.setState({ age: employeeAge });
    }

    // Update the state (Picture) on keyup
    private _updatePicture(employeePicture: string) {
        this.setState({ picture: employeePicture });
    }

    // Update message status
    private _updateMessageStatus() {
        this.setState({ message: true });
    }

    /**
     *  Change open state of adding employee
     */
    private _cancelAddEmployee() {
        this.setState({ addEmployee: false });
    }
    /**
     *  Change open state of deleting employee
     */
    private _cancelDeleteEmployee() {
        this.setState({ deleteEmployee: false });
    }

    /**
     * Show Employees search box
     */
    private _showEmployeeSearchBox() {
        if (this.state.Employees) {

            const filteredEmployees = this.state.Employees.filter((employee) => {
                if (employee) {
                    return employee.employee_name.toLocaleLowerCase().indexOf(this.state.queryEmployee) !== -1;
                }
            });

            return <div>
                <input
                    className="search_employees"
                    placeholder="Search by Name"
                    type="text"
                    onKeyUp={(e) => this._onEmployeeSearch(e.currentTarget.value)}
                />
                {this._showEmployees(filteredEmployees)}
            </div>
        }
    }

    /**
     * update search query
     */
    private _onEmployeeSearch(query: string) {
        this.setState({ queryEmployee: query.toLocaleLowerCase() });
    }

    /**
     * 
     * @param list Show list of employees
     */
    private _showEmployees(list: EmployeesItem[]) {
        if(this.state.currentEmployee){
            return <div className="lower_center_list_employees">
            <div className="display_buttons">
                <button className="header_button">Employee</button>
            </div>
            {
                list.map((employee, employeeIndex) => {
                    return [<div className="display_buttons" key={employeeIndex} onClick={() => this._selectEmployee(employee)}>
                        <button className="item_button" >{employee.employee_name}</button>
                    </div>];
                })
            }
        </div >
        }
        return <div className="center_list_employees">
            <div className="display_buttons">
                <button className="header_button">Employee</button>
            </div>
            {
                list.map((employee, employeeIndex) => {
                    return [<div className="display_buttons" key={employeeIndex} onClick={() => this._selectEmployee(employee)}>
                        <button className="item_button" >{employee.employee_name}</button>
                    </div>];
                })
            }
        </div >
    }

    /**
     * Show employee options
     */
    private _showEmployeeOptions() {
        if (!this.state.currentEmployee) {
            return <ul className="employees_options_bottom_right">
                <button onClick={() => this._selectAddEmployee(true)} className="item_button">Add Employee</button>
            </ul>;
        } else if (this.state.currentEmployee) {
            return [
                <div>
                    <ul className="employees_options">
                        <button className="header_button">{this.state.currentEmployee.employee_name}</button>
                        <button onClick={() => this._selectEdit(true)} className="item_button">Edit</button>
                    </ul>
                    <div className="employees_details">
                        <div>
                            <button className="header_button">Salary</button>
                            <button className="header_button">Age</button>
                            <button className="header_button">Picture</button>
                        </div>
                        <div>
                            <button className="item_button">{this.state.currentEmployee.employee_salary}</button>
                            <button className="break_item_button">{this.state.currentEmployee.employee_age}</button>
                            <button className="break_item_button">{this.state.currentEmployee.profile_image}</button>
                        </div>
                    </div>
                    <ul className="employees_options_right">
                        <button className="header_button">{this.state.currentEmployee.employee_name}</button>
                        <button onClick={() => this._selectDeleteEmployee(true)} className="item_button">Delete</button>
                    </ul>
                </div>,
                <ul className="employees_options_bottom_right">
                    <button onClick={() => this._selectAddEmployee(true)} className="item_button">Add Employee</button>
                </ul>];
        }
    }

    /**
     * Show message popup
     */
    private _showMessage() {
        if (this.state.message == true && this.state.title && this.state.messageContent) {
            return <PopUp
                title={this.state.title}
                message={this.state.messageContent}
                close={<div onClick={() => this._openPopup(false)}>ok</div>}
            ></PopUp>
        }
    }

    /**
     * open or close popup message
     * @param bool 
     */
    private _openPopup(bool: boolean) {
        if (this.state.message) {
            this.setState({ message: null });
        } else {
            this.setState({ message: bool });
        }
    }

    /**
     * 
     * update apps internal message
     * @param title 
     * @param message 
     */
    private _setMessage(title: string, message: string) {
        this.setState({ title: title });
        this.setState({ messageContent: message });
    }

    /*************************************************************************************
     * 
     *  CODE RELATED TO CHANGING Employee Info
     * 
     **************************************************************************************/

    /**
    *  Change edit employee state to true or false
    */
    private _selectEdit(bool: boolean) {
        this.setState({ editEmployee: bool });
    }

    /**
     * Show edit options 
     */
    private _showEditEmployee() {
        if (this.state.editEmployee == true && this.state.currentEmployee) {
            return <ul className="employees_options">
                <button onClick={() => this._selectChangeName(true)} className="item_button">Edit Name</button>
                <button onClick={() => this._selectChangeSalary(true)} className="item_button">Edit Salary</button>
                <button onClick={() => this._selectChangeAge(true)} className="item_button">Edit Age</button>
                <button onClick={() => this._selectChangePicture(true)} className="item_button">Change Pic</button>
            </ul>
        }
    }


    /*************************************************************************************
     * 
     *  CODE RELATED TO CHANGING Employee NAME
     * 
     **************************************************************************************/

    /**
     *  Change email change state to true or false
     */
    private _selectChangeName(bool: boolean) {
        this.setState({ changeName: bool });
    }

    /**
     * Show change email component depending on state
     */
    private _showChangeName() {
        if (this.state.changeName == true) {
            return <Dialog
                title={"Change Name"}
                body={<div >
                    <div className="small_Form_Input_Dialog">
                        New Employee Name
                <input

                            type="text"
                            placeholder="New name"
                            onKeyUp={(e) => this._updateName((e as any).target.value)}
                        />
                    </div>
                </div>}
                cancel={<button className="item_button" onClick={() => this._selectChangeName(false)}>Cancel</button>}
                submit={<button className="item_button" onClick={() => this._handleChangeName()}>ok</button>}
            >
            </Dialog>
        }
    }

    /**
     * Handle change Employee's Name
     */
    private _handleChangeName() {
        (async () => {
            try {
                //update message
                this._setMessage("Changing Name", "Name Changed");
                //if user is logged in and new email is set
                if (this.state.name && this.state.currentEmployee) {
                    const employee = await changeName(this.state.currentEmployee.id, this.state.name,
                        this.state.currentEmployee.employee_salary, this.state.currentEmployee.employee_age);
                    //update popup and dialog
                    this._openPopup(true);
                    this._selectChangeName(false);
                    /**
                     * Update states
                     */
                    let currentEmployees = this.state.Employees;
                    let currentEmployee = this.state.currentEmployee;
                    /**
                     * remove current Employee from list
                     * to modify it and add it again
                     */
                    if (currentEmployees) {
                        const index = currentEmployees.indexOf(currentEmployee, 0);
                        if (index > -1) {
                            currentEmployees.splice(index, 1);
                        }
                    }
                    currentEmployee.employee_name = this.state.name;
                    if (currentEmployees) {
                        currentEmployees.push(currentEmployee);
                    }
                    this.setState({ Employees: currentEmployees });
                    this._selectChangeName(false);
                    this._updateMessageStatus();
                }
            } catch (err) {
            }
        })();
    }

    /*************************************************************************************
     * 
     *  CODE RELATED TO CHANGING Employee Salary
     * 
     **************************************************************************************/

    /**
     *  Change salary change state to true or false
     */
    private _selectChangeSalary(bool: boolean) {
        this.setState({ changeSalary: bool });
    }

    /**
     * Show change salary component depending on state
     */
    private _showChangeSalary() {
        if (this.state.changeSalary == true) {
            return <Dialog
                title={"Change Salary"}
                body={<div >
                    <div className="small_Form_Input_Dialog">
                        New Salary
                <input

                            type="text"
                            placeholder="New salary"
                            onKeyUp={(e) => this._updateSalary((e as any).target.value)}
                        />
                    </div>
                </div>}
                cancel={<button className="item_button" onClick={() => this._selectChangeSalary(false)}>Cancel</button>}
                submit={<button className="item_button" onClick={() => this._handleChangeSalary()}>ok</button>}
            >
            </Dialog>
        }
    }

    /**
     * Handle change Employee's salary
     */
    private _handleChangeSalary() {
        (async () => {
            try {
                //update message
                this._setMessage("Changing Salary", "Salary Changed");
                //Check if new salary is set and employee is selected
                if (this.state.salary && this.state.currentEmployee) {
                    const employee = await changeSalary(this.state.currentEmployee.id, this.state.currentEmployee.employee_name,
                        this.state.salary, this.state.currentEmployee.employee_age);
                    //update popup and dialog
                    this._openPopup(true);
                    this._selectChangeSalary(false);
                    /**
                     * Update states
                     */
                    let currentEmployee = this.state.currentEmployee;
                    currentEmployee.employee_salary = this.state.salary;
                    this._selectChangeSalary(false);
                    this._updateMessageStatus();
                    this._updateEmployees();
                }
            } catch (err) {
            }
        })();
    }

    /*************************************************************************************
     * 
     *  CODE RELATED TO CHANGING Employee's Age
     * 
     **************************************************************************************/

    /**
     *  Change age change state to true or false
     */
    private _selectChangeAge(bool: boolean) {
        this.setState({ changeAge: bool });
    }

    /**
     * Show change age component depending on state
     */
    private _showChangeAge() {
        if (this.state.changeAge == true) {
            return <Dialog
                title={"Change Age"}
                body={<div >
                    <div className="small_Form_Input_Dialog">
                        New Age
                <input

                            type="text"
                            placeholder="Newage"
                            onKeyUp={(e) => this._updateAge((e as any).target.value)}
                        />
                    </div>
                </div>}
                cancel={<button className="item_button" onClick={() => this._selectChangeAge(false)}>Cancel</button>}
                submit={<button className="item_button" onClick={() => this._handleChangeAge()}>ok</button>}
            >
            </Dialog>
        }
    }

    /**
     * Handle change Employee's age
     */
    private _handleChangeAge() {
        (async () => {
            try {
                //update message
                this._setMessage("Changing Age", "Age Changed");
                //if age state is set and employee selected
                if (this.state.age && this.state.currentEmployee) {
                    const employee = await changeAge(this.state.currentEmployee.id, this.state.currentEmployee.employee_name,
                        this.state.currentEmployee.employee_salary, this.state.age);
                    //update popup and dialog
                    this._openPopup(true);
                    this._selectChangeSalary(false);
                    /**
                     * Update states
                     */
                    let currentEmployee = this.state.currentEmployee;
                    currentEmployee.employee_age = this.state.age;
                    this._selectChangeAge(false);
                    this._updateMessageStatus();
                    this._updateEmployees();
                }
            } catch (err) {
            }
        })();
    }

    /*************************************************************************************
     * 
     *  CODE RELATED TO CHANGING Employee's Picture
     * 
     **************************************************************************************/

    /**
     *  Change age change state to true or false
     */
    private _selectChangePicture(bool: boolean) {
        this.setState({ changePic: bool });
    }

    /**
     * Show change pic component depending on state
     */
    private _showChangePicture() {
        if (this.state.changePic == true) {
            return <Dialog
                title={"Change Picture"}
                body={<div >
                    <div className="small_Form_Input_Dialog">
                        New Picture
                <input

                            type="text"
                            placeholder="new picture address"
                            onKeyUp={(e) => this._updatePicture((e as any).target.value)}
                        />
                    </div>
                </div>}
                cancel={<button className="item_button" onClick={() => this._selectChangePicture(false)}>Cancel</button>}
                submit={<button className="item_button" onClick={() => this._handleChangePicture()}>ok</button>}
            >
            </Dialog>
        }
    }

    /**
     * Handle change Employee's pic
     */
    private _handleChangePicture() {
        (async () => {
            try {
                //update message
                this._setMessage("Changing Picture", "Picture Changed");
                //if pic state is set and employee selected
                if (this.state.picture && this.state.currentEmployee) {
                    const employee = await changePicture(this.state.currentEmployee.id, this.state.currentEmployee.employee_name,
                        this.state.currentEmployee.employee_salary, this.state.currentEmployee.employee_age,
                        this.state.picture);
                    //update popup and dialog
                    this._openPopup(true);
                    this._selectChangePicture(false);
                    /**
                     * Update states
                     */
                    let currentEmployee = this.state.currentEmployee;
                    currentEmployee.profile_image = this.state.picture;
                    this._selectChangeAge(false);
                    this._updateMessageStatus();
                    this._updateEmployees();
                }
            } catch (err) {
            }
        })();
    }



    /*************************************************************************************
        * 
        *  CODE RELATED TO Adding Employee
        * 
        **************************************************************************************/

    private _updateEmployees(){
        (async () => {
            const employees = await getEmployees() as EmployeesItem[];
            if (employees) {
                this.setState({ Employees: employees });
            }
        })();
    }

    // Send HTTP request (add Employee to database)on click
    private _handleAddEmployee() {
        (async () => {
            try {
                //update message
                this._setMessage("Adding Employee", "Employee Added");
                if (this.state.name && this.state.salary && this.state.age) {

                    const employee = await createEmployee(this.state.name,
                        this.state.salary, this.state.age) as unknown as EmployeesItem;
                    /**
                     * Update states
                     */
                    this.setState({currentEmployee: null});
                    this._selectAddEmployee(false);
                    this._updateMessageStatus();
                    this._updateEmployees();
                }
            } catch (err) {
            }
        })();
    }

    /**
     * Show add Employee dialog
     */
    private _showAddEmployee() {
        if (this.state.addEmployee == true) {
            return <Dialog
                title={"Add Employee"}
                body={<div className="big_dialog_content_form">
                    <div className="smaller_Form_Input_Dialog">
                        Name:
                <input
                            type="text"
                            placeholder="name"
                            onKeyUp={(e) => this._updateName((e as any).target.value)}
                        />
                    </div>
                    <div className="smaller_Form_Input_Dialog">
                        Salary:
                <input
                            type="text"
                            placeholder="Salary"
                            onKeyUp={(e) => this._updateSalary((e as any).target.value)}
                        />
                    </div>
                    <div className="smaller_Form_Input_Dialog">
                        Age:
                <input
                            type="text"
                            placeholder="Age"
                            onKeyUp={(e) => this._updateAge((e as any).target.value)}
                        />
                    </div>
                </div>}

                cancel={<button className="item_button" onClick={() => this._cancelAddEmployee()}>Cancel</button>}
                submit={<button className="item_button" onClick={() => this._handleAddEmployee()}>Add</button>}
            >
            </Dialog>
        } else {
            return
        }
    }

    /*************************************************************************************
     * 
     *  CODE RELATED TO Deleting Employee
     * 
     **************************************************************************************/

    // Send HTTP request (delete Employee)on click
    private _handleDeleteEmployee() {
        (async () => {
            try {
                //update message
                this._setMessage("Deleting Employee", "Employee Removed");
                if (this.state.currentEmployee && this.state.Employees) {

                    const employee = await deleteEmployee(this.state.currentEmployee.id) as unknown as EmployeesItem;
                    /**
                     * Update states
                     */
                    this.setState({currentEmployee: null});
                    this._selectDeleteEmployee(false);
                    this._updateMessageStatus();
                    this._updateEmployees();
                }
            } catch (err) {
            }
        })();
    }



    /**
     * Show delete employee dialog
     */
    private _showDeleteEmployee() {
        if (this.state.deleteEmployee == true) {
            return <Dialog
                title={"Delete Employee"}
                body={<div style={formHolder}>
                    <div style={deleteMessage}>
                        Are you sure you want to delete this Employee?
                    </div>
                </div>}
                cancel={<button className="item_button" onClick={() => this._cancelDeleteEmployee()}>Cancel</button>}
                submit={<button className="item_button" onClick={() => this._handleDeleteEmployee()}>Delete</button>}
            >
            </Dialog>
        } else {
            return
        }
    }
}



/**
 * "Delete" employee from database
 * 
 * @param id 
 * @param jwt 
 */
async function deleteEmployee(id: number) {
    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const response = await fetch(
                `http://dummy.restapiexample.com/api/v1/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}

/**
 * Change employee;s Salary
 * 
 * @param id 
 * @param jwt 
 */
async function changeSalary(id: number, name: string, salary: string, age: string) {
    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const update = {
                name: name,
                salary: salary,
                age: age
            };
            const response = await fetch(
                `http://dummy.restapiexample.com/api/v1/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(update)
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}

/**
 * Change employee's age
 * 
 * @param id 
 * @param jwt 
 */
async function changeAge(id: number, name: string, salary: string, age: string) {
    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const update = {
                name: name,
                salary: salary,
                age: age
            };
            const response = await fetch(
                `http://dummy.restapiexample.com/api/v1/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(update)
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}

/**
 * Change employee's picture
 * 
 * @param id 
 * @param jwt 
 */
async function changePicture(id: number, name: string, salary: string, age: string, pic: string) {
    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const update = {
                name: name,
                salary: salary,
                age: age,
                profile_image: pic
            };
            const response = await fetch(
                `http://dummy.restapiexample.com/api/v1/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(update)
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}

/**
 * Change employee company name
 * 
 * @param id 
 * @param jwt 
 */
async function changeName(id: number, name: string, salary: string, age: string) {
    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const update = {
                name: name,
                salary: salary,
                age: age
            };
            const response = await fetch(
                `http://dummy.restapiexample.com/api/v1/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(update)
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}

/**
 * Get employees
 */
async function getEmployees() {
    return new Promise(function (resolve, reject) {
        (async () => {
            const response = await fetch(
                `http://dummy.restapiexample.com/api/v1/employees`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}

/**
 * Add employee to database
 * 
 */
async function createEmployee(name: string, salary: string, age: string) {
    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const data = {
                name: name,
                salary: salary,
                age: age
            };
            console.log(data);
            const response = await fetch(
                "http://dummy.restapiexample.com/api/v1/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}


