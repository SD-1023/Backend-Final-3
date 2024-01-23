import express from 'express'

const router = express.Router()
import { sessionMiddleware } from '../middlewares/sessionMiddleware'
import {getOrders} from '../controllers/orderController'


router.get('/orders',sessionMiddleware,getOrders)


export default router