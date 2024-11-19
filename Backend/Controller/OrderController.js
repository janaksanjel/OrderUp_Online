import orderModel from "../models/order.js";
import userModel from "../models/UserModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "https://orderup-frontend.onrender.com"; //this port is come from frontend port number faraka
    // vaya we need change this link or same as front running port
                                                  

    try {
        // Create a new order document
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // Save the new order to the database
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'Npr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100   // Adjust as per your business logic
            },
            quantity: item.quantity,
        }));

        // Add delivery charge to line items
        line_items.push({
            price_data: {
                currency: 'Npr',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 80*100 // Adjust as per your business logic
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Respond with the session URL to redirect the client
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};


const VerifyOrder = async (req, res) => {
    const {orderId,success} =req.body;
    try {
        
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})

        }
        else{
            await orderModel.findByIdAndDelete(orderId,{payment:false});
            res.json({success:false,message:"not paid"})
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.json({ success: false, message: "Error verifying order" });
        
    }

}

// user order for frontend
const userOrder = async (req, res) => {
    try {
        
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.error("Error getting user orders:", error);
        res.json({ success: false, message: "Error getting user orders" });
        
    }
    
}






// listing order for admin pannel
const listOrder = async (req, res) => {

    try {
        const order =await orderModel.find({});
        res.json({success:true,data:order})
    } catch (error) {
        console.error("Error getting user orders:", error);
        res.json({ success: false, message: "Error getting user orders" });
        
    }

}
// api for order status in admin pannel

const updateStatus = async (req, res) => {

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated Successfully"})
        
    } catch (error) {
        console.log(error);
    
        res.json({ success: false, message: "Error updating order status" });
        
    }

}


export { placeOrder,VerifyOrder,userOrder,listOrder,updateStatus };
