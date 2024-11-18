import FoodModel from "../models/foodmodel.js";
import fs from 'fs';


//add food item
const addFood = async (req,res)=>{
    let image_filename =`${req.file.filename}`;

    const food =new FoodModel({
        name:req.body.name,
        price:req.body.price,
        image:image_filename,
        description:req.body.description,
        category:req.body.category,
    })

    try{
        await food.save();
       res.json({success:true,message:"Food Added Sucessfully"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Food Not Added"})
    }

}

// all food list
const listfood = async (req,res)=>{

try{
    const food = await FoodModel.find({});
    res.json({success:true,message:"Food List",data:food})

}catch(error){
    console.log(error);
    res.json({success:false,message:"Food List Not Found"})
}

}

//remove food item

const removefood =async (req,res)=>{

    try{

        const food = await FoodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await FoodModel.findByIdAndDelete(req.body.id);

    
        res.json({success:true,message:"Food Remove Sucessfully"})


    }catch(error){
        console.log(error);
        res.json({success:false,message:"Food Not Remove"})
    }

}



const getFoodById = async (req, res) => {
    try {
        const food = await FoodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.json({ success: true, data: food });
    } catch (error) {
        console.log("Error fetching food item:", error);
        res.status(500).json({ success: false, message: "Error fetching food item" });
    }
};

export {addFood,listfood,removefood,getFoodById}