
import {  addressModel,userModel} from "../models/modelsRelations"
import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/sessionMiddleware'


export const getAddress = async (req: CustomRequest, res: Response): Promise<any> => {

  try {
   const userID = req.user.userID;


    if (!userID) {
      return res.status(400).json({ error: 'useris is required' })
    }

    const address = await addressModel.findAll({
      attributes: ['street', 'state', 'city', 'pinCode'],
      include: [
        {
          model: userModel,
          attributes: ['firstName', 'lastName', 'mobile'],
          required: false
        }
      ],
      where: {
        userID: userID
      }
    });

    
    if (!address) {
      return res.status(400).json('Not Found')
    }

    return res.json({ address });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


