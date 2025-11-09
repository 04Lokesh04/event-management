import { Router } from 'express'
import {createProfile, getProfile} from '../controllers/profileController.js'
const route=Router()

route.get('/', getProfile)
route.post('/', createProfile)

export default route