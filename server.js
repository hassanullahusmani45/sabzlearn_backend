import mongoose from "mongoose";
import { app } from "./app.js";
import "dotenv/config"

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


(async () => {
    await mongoose.connect(MONGO_URI);
})();

app.listen(PORT, () => {
    console.log(`Server is runing on port 🌐 http://localhost:${PORT}`);

})