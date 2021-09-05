import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const handleHome = (req, res) => {
    return res.send("I love middle ware");
};

app.use(morgan("dev"));
app.get("/", logger, handleHome);


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);