import { Router } from 'express'
import {getEvent, updateEvent, createEvent, getLogs} from "../controllers/eventController.js"
const route=Router()

route.get('/', getEvent)
route.post('/', createEvent)
route.patch('/:eventId', updateEvent)
route.get('/:eventId/logs', getLogs)

export default route