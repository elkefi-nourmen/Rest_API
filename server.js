const express=require('express');
const app=express();
const Product=require('./models/productModel');
const mongoose=require('mongoose');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://maram:12657866ak@cluster0.on7g7xc.mongodb.net/nodeAPI')
    .then(()=>{
        app.listen(3000,()=>{
            console.log("node API is running on port 3000")
        })
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    })

//routes
app.get('/',(req,res)=>{
res.send("hello");
})

app.get('/blog',(req,res)=>{
    res.send("hello to my blog");

})

app.get('/products',async(req,res)=>{
    try {
        const products =await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})
//update the product
app.put('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findByIdAndUpdate(id,req.body);
        if (!product){
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }
        const updateProduct=await Product.findById(id);
        res.status (200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message:error.message});

    }
})
// delete product
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findByIdAndDelete(id);
        if (!product){
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }
        res.status (200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});

    }
})

app.post('/products',async(req,res)=>{
    try {
        const product= await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})