const { Schema, model } = require('mongoose');

const EventSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

// Overwrites some values
EventSchema.method('toJSON', function () {
	// ref to => EventSchema object
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Event', EventSchema);
