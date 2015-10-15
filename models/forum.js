var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TopicSchema = Schema({
	author: {type: String, required: false},
	title: {type: String, required: false},
	content: {type: String, required: false},
	vote: [Number],
	comment: [] //{user: String, content: String}
});

var TopicModel = mongoose.model("TopicModel", TopicSchema);

module.exports = TopicModel;
