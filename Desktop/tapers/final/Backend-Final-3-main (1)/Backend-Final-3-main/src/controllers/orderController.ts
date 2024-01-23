
import {   orderModel} from "../models/modelsRelations"
import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/sessionMiddleware'



export const getOrders =async (req: CustomRequest, res: Response): Promise<any> => {

  try {
    const state = req.query.state as string ;
    const userID = req.user.userID;


    if (!userID) {
      return res.status(400).json({ error: 'useris is required' })
    }

    const orders = await orderModel.findAll({
      attributes:['orderID','date','grandTotal','isPaid'],
      where: {
        state: state ,
        isPaid:true  
      },
    });

    if(!orders){
      res.status(400).json("Not Found");
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
    res.status(500).json( error.message );
  }

}


