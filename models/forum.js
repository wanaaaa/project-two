var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TopicSchema = Schema({
	title: {type: String, required: false},
	content: {type: String, required: false},
	vote: [Number],
	comment: [String]
});

var TopicModel = mongoose.model("TopicModel", TopicSchema);

module.exports = TopicModel;
