const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  details:{
    type: Array,
  }
})

const linkItems= mongoose.model('LinkItems',ItemSchema);

export default linkItems;
