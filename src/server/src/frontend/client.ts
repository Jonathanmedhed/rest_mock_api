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

