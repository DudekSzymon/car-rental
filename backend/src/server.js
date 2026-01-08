const app = require("./app");
const connectDB = require("./config/db");

// Łączymy się z bazą danych
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
