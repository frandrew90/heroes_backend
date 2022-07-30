const app = require('../app');
const mongoose = require('mongoose');

const { PORT, MONGO_URL1 } = process.env;

mongoose
  .connect(MONGO_URL1)
  .then(() => {
    console.log(' Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
