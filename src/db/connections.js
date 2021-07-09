const mongoose = require("mongoose");
const connectMongo = async () => {
  mongoose.connect("mongodb://localhost:3030", {
    useNewUrlParser: true,
  });
};

module.export = {
  connectMongo,
};
