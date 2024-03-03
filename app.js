const express = require("express");

const app = express();
const port = 3000;

app.get("/api", (request, response) => {
    response.json({
        success: 400,
        message: "Success!"
    });
});

app.listen(port, () => {
   console.log(`Server has started its work successfully on port: ${port}`);
});