import express from 'express'

import {registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
    
 } from "../controllers/authController.js";
 import {requireSignIn, isAdmin} from "../middlewares/authMiddleware.js" 


const router = express.Router()

//routing

//ragister mrthod post
router.post('/register',registerController);

//login methid post

router.post('/login',loginController);

//forget password post
router.post('/forgot-password',forgotPasswordController)


//test

router.get('/test',requireSignIn,isAdmin,testController);

//auth route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true}); 
})

//auth route admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true}); 
})

//update profile

router.put("/profile", requireSignIn, updateProfileController);

//orders

router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


export default router
 


