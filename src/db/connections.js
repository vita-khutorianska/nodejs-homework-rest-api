const mongoose = require("mongoose");
const connectMongo = async () => {
  mongoose.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
  });
};

module.export = {
  connectMongo,
};
