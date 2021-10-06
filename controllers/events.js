const { response } = require('express');
const EventModel = require('../models/EventModel');

const getEvents = async (req, res = response) => {
	const events = await EventModel.find().populate('user', 'name');

	res.json({
		ok: true,
		events,
	});

	return res.json({
		ok: true,
		msg: 'getEvents',
	});
};

const createEvent = async (req, res = response) => {
	const event = new EventModel(req.body);

	try {
		event.user = req.uid;

		const eventSaved = await event.save();
		res.json({
			ok: true,
			event: eventSaved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

const updateEvent = async (req, res) => {
	const eventId = req.params.id;

	try {
		const event = await EventModel.findById(eventId);
		const uid = req.uid;
		if (!event) {
			res.status(404).json({
				ok: false,
				msg: 'Event not found',
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Action forbiden',
			});
		}

		const newEvent = {
			...req.body,
			user: uid,
		};

		const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		res.json({
			ok: true,
			event: eventUpdated,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

const deleteEvent = async (req, res) => {
	const eventId = req.params.id;

	try {
		const event = await EventModel.findById(eventId);
		const uid = req.uid;
		if (!event) {
			res.status(404).json({
				ok: false,
				msg: 'Event not found',
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Action forbiden',
			});
		}

		await EventModel.findByIdAndDelete(eventId);

		res.json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
};
