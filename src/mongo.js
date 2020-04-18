const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:admin@tmcluster-eq49l.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("successfully connected");
});

const ItemSchema = new mongoose.Schema({
  details: {
    type: Object,
  },
});

const linkItems = mongoose.model("LinkItems", ItemSchema);

const arr1 = new linkItems({ details: { name: [1, 2, 3] } });

arr1.save();

// linkItems.create({ size: "small" }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });

module.exports = {
  linkItems,
};

// const Cat = mongoose.model("Cat", { name: String });
// //const Kitty = mongoose.model("Kitty", { name: String }, { likes: Number });

// var silence = new Cat({ name: "Silence" });
// silence.save().then(() => console.log("done"));
// //var aas = new Kitty({ name: "cat" }, { likes: 20 });
// //aas.save().then(() => console.log("done"));

// Cat.find({ name: "Silence" }).then((cat) => {
//   console.log(cat);
// });

// Cat.find((err, done) => {
//   if (err) return console.error(err);
//   //if (done.name == "Silence") {
//   console.log(done);
//   //}
// });

// Cat.find({ name: /^Silence/ }, (cat) => {
//   //console.log(cat);
// });

//console.log(silence.name); // 'Silence'
//silence.save().then(() => console.log("silence"));

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
