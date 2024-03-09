require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.get("/api", (request, response) => {
    response.json({
        success: 400,
        message: "Success!"
    });
});

require("./routes/note.routes")(app);

app.listen(process.env.APP_PORT, () => {
   console.log(`Server has started its work successfully on port: ${process.env.APP_PORT}`);
});