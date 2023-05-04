const app = require("./App");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
    port = 3075;
} else {
    port = 8111;
}

app.listen(port, () => {
    console.log(`listining to port ${port}...`);
});
