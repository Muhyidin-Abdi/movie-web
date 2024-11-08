const app = require("./src/app.js");
const { db } = require("./db/connection")

const PORT = process.env.PORT || 3000;

db.sync({ force: false })  
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error('Failed to start server:', error));