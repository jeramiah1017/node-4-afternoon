require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const ctrl = require("./controller/swagController");
const auth = require("./controller/authController");
const cart = require("./controller/cartController")
const search = require("./controller/searchController")

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get("/api/swag", ctrl.read);

app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);

app.post('/api/cart/checkout', cart.checkout)
app.post('/api/cart/:id', cart.add)
app.delete('/api/cart/:id', cart.delete)

app.get('/api/search', search.search)

app.listen(SERVER_PORT, () => console.log(`snorkle alert ${SERVER_PORT}`));
