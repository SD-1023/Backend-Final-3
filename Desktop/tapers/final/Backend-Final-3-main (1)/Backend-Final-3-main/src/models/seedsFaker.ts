import { faker } from '@faker-js/faker';
import { categoryModel, brandModel, userModel, sessionModel, productModel, orderModel,addressModel } from '../models/modelsRelations';

const { v4: uuidv4 } = require('uuid');

const generateRandomData = () => {


  const randomCategory = () => ({
    name: faker.commerce.productName(),
  });

  const randombrand = () => ({
    name: faker.person.firstName(),
  });

  const randomUser = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),  // Use faker.internet.password() for generating random passwords
    mobile: faker.phone.number(),  // Use faker.phone.phoneNumber() for generating random phone numbers
    image: faker.image.avatar(),  // Use faker.image.avatar() for generating a random avatar image URL
  });

  const randomSession = (userID) => ({
    sessionID: uuidv4(), // Using uuid to generate a unique session ID
    userID: userID,
  });


  const randomProduct = (brandID, categoryID) => ({
    title: faker.commerce.productName(),
    subTitle: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    price: faker.number.float(),
    quantity: faker.number.float(),
    categoryID: categoryID,
    discount: faker.number.float(),
    arrivalDate: faker.date.future().toISOString().split('T')[0], // Random future date as string in YYYY-MM-DD format
    brandID: brandID,
  });



  const orderStates = ['completed', 'processing', 'cancel'];
  const randomState = orderStates[Math.floor(Math.random() * orderStates.length)];

  const randomOrder = (userID, addressID, orderID) => ({
    orderID: orderID,
    userID: userID,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    mobile: faker.phone.number(),
    addressID: addressID,
    state: randomState,
    isPaid: faker.number.binary(),
    date: faker.date.future().toISOString().split('T')[0],
    paymentMethod: faker.finance.transactionType(),
    grandTotal: faker.number.float(),
  });

  const randomAddress = (addressID, userID) => ({
    addressID: addressID,
    userID: userID,
    street:  faker.person.firstName(),
    state:  faker.person.firstName(),
    city:  faker.person.firstName(),
    pinCode: '6757',

  });

  return {
    randomCategory,
    randombrand,
    randomUser,
    randomSession,
    randomProduct,
    randomOrder,
    randomAddress
  };
};




export const fillTables = async () => {
  try {
    const { randomCategory, randombrand, randomUser, randomSession, randomProduct, randomOrder,randomAddress } = generateRandomData();

    // Insert Category
    for (let i = 0; i < 10; i++) {
      const Category = randomCategory();
      const addedCategory = await categoryModel.create(Category);
      if (addedCategory) {
        const insertedCategories = await categoryModel.findAll({
          attributes: ['name'], // Specify the attributes you want to retrieve, or leave it empty for all attributes
        });
     console.log("Inserted Categories:", insertedCategories.map(category => category.name).join(', '));
      }
  
    }

  
    // Insert brand
    for (let i = 0; i < 10; i++) {
      const brand = randombrand();
      const addedbrand = await brandModel.create(brand);
      if (addedbrand) {
        const insertedbrands = await brandModel.findAll({
          attributes: ['name'], // Specify the attributes you want to retrieve, or leave it empty for all attributes
        });
      //  console.log("Inserted brand:", insertedbrands.map(brand => brand.name).join(', '));
      }
    }

    // Insert user
    for (let i = 0; i < 10; i++) {
      const user = randomUser();
      const addedUser = await userModel.create(user);
      if (addedUser) {

        const insertedUser = await userModel.findAll({
          attributes: ['firstName', 'lastName'],
        });
        console.log("Inserted user:", insertedUser.map(user => user.firstName).join(', '));
      }
    }
    // Insert session
    for (let i = 0; i < 10; i++) {
      const userID = faker.number.int({ min: 1, max: 10 });
      const session = randomSession(userID);

      const addedSession = await sessionModel.create(session);
      if (addedSession) {
        const insertedSession = await sessionModel.findAll({
          attributes: ['sessionID'],
        });
        console.log("Inserted session:", insertedSession.map(sessions => sessions.sessionID).join(', '));
      }

    }

    //insert product
    for (let i = 0; i < 10; i++) {
      const brandID = faker.number.int({ min: 1, max: 10 });
      const categoryID = faker.number.int({ min: 1, max: 10 });
      const product = randomProduct(brandID, categoryID);

      const addedProduct = await productModel.create(product);
      if (addedProduct) {
        const insertedProduct = await productModel.findAll({
          attributes: ['title'],
        });
        console.log("Inserted product:", insertedProduct.map(product => product.title).join(', '));
      }
    }

 //insert Address
 for (let i = 0; i < 20; i++) {
  const userID = faker.number.int({ min: 1, max: 10 });
  const addressID = faker.number.int({ min: 1, max: 20 });

  const addres = randomAddress(addressID,userID);

  const addedAddress= await addressModel.create(addres);
  if (addedAddress) {
    const insertedAddress = await addressModel.findAll({
      attributes: ['street'],
    });
  console.log("Inserted address:", insertedAddress.map(addres => addres.street).join(', '));
  }
  else{
    console.log("error in add faker addres");
  }
}


    //insert order
    for (let i = 0; i < 20; i++) {
      const userID = faker.number.int({ min: 1, max: 10 });
      const addressID = faker.number.int({ min: 1, max: 20 });
      const orderID = faker.number.int({ min: 1, max: 20 });

      const order = randomOrder(userID, addressID, orderID);

      const addedOrder = await orderModel.create(order);
      if (addedOrder) {
        const insertedOrder = await orderModel.findAll({
          attributes: ['firstName'],
        });
      console.log("Inserted order:", insertedOrder.map(order => order.firstName).join(', '));
      }
    }


   


    console.log("Faker inserted data successfully!");
  } catch (error) {
    console.error(" Insert faker done, but the validation for relation ships may be wrong becouse", error.message);
  }

};

