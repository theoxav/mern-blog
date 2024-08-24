import config from "./config/config.js";
import app from "./app.js";

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
