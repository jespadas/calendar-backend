/* 
	Events routes / Events
	host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/events');
const { isDate } = require( '../helpers/isDate' );

const router = Router();

// Alls routes passing to jwtValidator middleware
router.use(jwtValidator);

//  Get events
router.get('/', getEvents);

//  Create events
router.post(
	'/',
	[
		check('title', 'Title is required').not().isEmpty(),
		check('start', 'Start date is required').custom(isDate),
		check('end', 'End date is required').custom(isDate),
		fieldValidator,
	],
	createEvent
);

//  Update events
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
