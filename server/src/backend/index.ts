import { createApp } from "./config/app";

(async () => {

    const app = await createApp();
    const port = process.env.PORT || 8080;
    // Start the server
    app.listen(port, () => {
        console.log(
            "The server is running in port 8080!"
        );
    });

})();
