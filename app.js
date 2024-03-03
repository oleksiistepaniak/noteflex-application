require("dotenv").config();
const express = require("express");

const app = express();

app.get("/api", (request, response) => {
    response.json({
        success: 400,
        message: "Success!"
    });
});

app.listen(process.env.APP_PORT, () => {
   console.log(`Server has started its work successfully on port: ${process.env.APP_PORT}`);
});