/****************************************************************
*  AUTH SERVICES
****************************************************************/

async function getToken(email: string, password: string) {
    const data = {
        email: email,
        password: password
    };
    const response = await fetch(
        "/api/v1/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

/****************************************************************
*  USER SERVICES
****************************************************************/

(async () => {

    const newUser = {
        email: "1jonathan@something.com",
        password: "password",
        contactName: "jonathan",
        companyName: "kjon"
    };

    const response = await fetch(
        "http://localhost:8080/api/v1/users/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(newUser)
        }
    );

    const json = await response.json();
    console.log(json);

})();

//Send Email 
(async () => {

    const newEmail = {
        from: '',
        to: 'jonathanmedhed@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    const response = await fetch(
        "http://localhost:8080/api/v1/users/sendemail",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(newEmail)
        }
    );

    const json = await response.json();
    console.log(json);

})();

async function sendMail() {
    const response = await fetch(
        "/api/v1/users/sendemail",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const json = await response.json();
    return json;
}

async function createUser(email: string, password: string, contactName: string, companyName: string) {
    const data = {
        email: email,
        password: password,
        contactName: contactName,
        companyName: companyName
    };
    const response = await fetch(
        "/api/v1/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

async function getUserById(id: number, jwt: string) {
    const response = await fetch(
        `/api/v1/users/${id}`,
        {
            method: "GET",
            headers: {
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

//DELETE User

async function deleteUser(id: number, jwt: string) {
    const response = await fetch(
        `/api/v1/users/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

//Update user

async function updateUser(id: number, email: string, jwt: string) {
    const update = {
        email: email
    };
    const response = await fetch(
        `/api/v1/users/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}



/****************************************************************
*  SUPPLIER SERVICES
****************************************************************/

async function createSupplier(email: string, contactName: string, companyName: string, phoneNumber: string) {
    const data = {
        email: email,
        contactName: contactName,
        companyName: companyName,
        phoneNumber: phoneNumber
    };
    const response = await fetch(
        "/api/v1/suppliers",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

async function deleteSupplierById(id: number, jwt: string) {
    const response = await fetch(
        `/api/v1/suppliers/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

async function updateSupplier(id: number, email: string, jwt: string) {
    const update = {
        email: email
    };
    const response = await fetch(
        `/api/v1/suppliers/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}

async function addToSupplier(id: number, productId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/suppliers/${id}/add/${productId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

async function removeFromSupplier(id: number, productId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/suppliers/${id}/remove/${productId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

/****************************************************************
*  PRODUCT SERVICES
****************************************************************/

//POST for product with supplier

async function createProduct(name: string, type: string, supplierId: number, jwt: string) {
    const data = {
        name: name,
        type: type
    };
    const response = await fetch(
        `/api/v1/products/${supplierId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

async function deleteProductById(id: number, jwt: string) {
    const response = await fetch(
        `/api/v1/products/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

async function updateProduct(id: number, name: string, jwt: string) {
    const update = {
        name: name
    };
    const response = await fetch(
        `/api/v1/products/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}

//ADD supplier to product

async function addToProduct(id: number, supplierId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/products/${id}/add/${supplierId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}
//REMOVE supplier from product

async function removeProduct(id: number, supplierId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/products/${id}/remove/${supplierId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

/****************************************************************
*  ORDER SERVICES
****************************************************************/

async function createOrder(date: string, jwt: string) {
    const data = {
        date: date,
        confirmed: false
    };
    const response = await fetch(
        `/api/v1/orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

async function deleteOrderById(id: number, jwt: string) {
    const response = await fetch(
        `/api/v1/orders/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}
//ADD product to order

async function addToOrder(id: number, productId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/orders/${id}/add/${productId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

//REMOVE product from order

async function removeFromOrder(id: number, productId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/orders/${id}/remove/${productId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

//ADD supplier to order

async function addToOrder(id: number, supplierId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/orders/${id}/addsup/${supplierId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

//REMOVE supplier from order

async function removeFromOrder(id: number, supplierId: number, jwt: string) {

    const response = await fetch(
        `/api/v1/orders/${id}/removesup/${supplierId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
        }
    );
    const json = await response.json();
    return json;
}

async function updateOrder(id: number, name: string, jwt: string) {
    const update = {
        favourite: name
    };
    const response = await fetch(
        `/api/v1/orders/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}

