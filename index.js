const server = require("./api/server");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
