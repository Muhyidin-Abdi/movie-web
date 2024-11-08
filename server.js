const app = require("./src/app.js");
const { db } = require("./db/connection")

const PORT = process.env.PORT || 3000;

// sync to db
db.sync({ force: false })
//listen at localhost3000
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});