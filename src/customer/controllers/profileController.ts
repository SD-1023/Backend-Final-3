import { Request, Response } from 'express'
import { CustomRequest } from "../middlewares/sessionMiddleware";
import * as models from '../../models/modelsRelations'
import * as userServices from '../../services/userServices'

interface MulterRequest extends Request, CustomRequest {
  file: {
    buffer: Buffer;
  };
}

export const getMyRatingsAndReviews = async function (req: CustomRequest, res: Response): Promise<any> {
  try {
    const userID = req.user.userID
    const result = userServices.getUserRatingsAndReviews(userID)

    res.send(200).json(result)

  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getUserProfile = async function (req: CustomRequest, res: Response): Promise<any> {
  try {
    const userID = req.user.userID;

    const result = await userServices.getUserProfile(userID)
    res.status(200).json(result)

  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}

export const updateUserProfile = async function (req: CustomRequest, res: Response): Promise<any> {
  try {
    const userID = req.user.userID;

    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res.status(404).json("Invalid input")
    }

    // if(mobile){
    //     // phone number should be in this format "+xx xx-xxx-xxxx" or "+xxx xx-xxx-xxxx"
    //     const phoneRegex = /^\+(\d{2,3})\s(\d{2})-(\d{3})-(\d{4})$/;
    //     if(!phoneRegex.test(mobile)){
    //         return res.status(404).json("Invalid phone number");
    //     }
    // }

    await userServices.updateUserProfile(userID, { firstName: firstName, lastName: lastName })
    res.status(201)

  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}

export const uploadPhoto = async (req: MulterRequest, res: Response): Promise<any> => {
  try {
    const userID = req.user.userID;
    if (!userID) {
      return res.status(400).json('Invalid input');
    }
    const fileBuffer = req.file?.buffer;
    console.log('New Image:', fileBuffer);

    if (!fileBuffer) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // return res.status(200).json(fileBuffer);
    const updatedUser = await userServices.updateUserProfile(userID, { image: fileBuffer })

    if (!updatedUser) {
      return res.status(400).json("Uploaded Failed");
    }
    return res.status(200).json(updatedUser.image);

  } catch (error) {
    console.error('Error in uploadPhoto:', error)
    return res.status(500).json(error.message)
  }
}

export const deletePhoto = async (req: CustomRequest, res: Response) => {
  try {

    const userID = req.user.userID
    if (!userID) {
      return res.status(404).json({ error: 'User Not found ' })
    }

    const existPhoto = await models.userModel.findOne({
      where: { userID: userID },
      attributes: ['image'],
    })

    if (!existPhoto.image) {
      return res.status(400).json('User image not found or does not exist.')
    }

    const deletePhoto = await userServices.updateUserProfile(userID, { image: null })

    if (!deletePhoto) {
      return res.status(404).json(' Failed Delete Photo')
    }
    return res.status(200)

  } catch (error) {
    res.status(500).json('Failed to Delete Photo')
  }
}