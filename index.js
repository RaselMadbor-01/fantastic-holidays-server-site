const express=require("express");
const cors=require("cors");
const { MongoClient } = require('mongodb');
const ObjectId=require("mongodb").ObjectId;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vkos1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const port=process.env.PORT||5000;


const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is connect");
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run(){
    try{
        await client.connect()
        const database=client.db("fantasticData");
        const allDestinations=database.collection("allDestinations");
        const allClients=database.collection("allClients");
        const allBanners=database.collection("allBanners");
        const allInformations=database.collection("allInformations");
        console.log("mongodb connent successfully");

        //GET 
        app.get("/allDestination",async(req,res)=>{
            const query=allDestinations.find({});
            const result=await query.toArray();
            res.send(result);
        })
        

       //GET
        app.get("/allClient",async(req,res)=>{
            const query=allClients.find({});
            const result=await query.toArray();
            res.send(result);
        })

        //GET
        app.get("/allBanner",async(req,res)=>{
            const query=allBanners.find({});
            const result=await query.toArray();
            res.send(result);
        })
         //GET
         app.get("/mybookings",async(req,res)=>{
            const userEmail=req.query.email;
            const query={email:userEmail};
            const cursor=allInformations.find(query);
            const result=await cursor.toArray();
            res.send(result);
        })
        //GET
        app.get("/allBookings",async(req,res)=>{
            const cursor=allInformations.find({});
            const result=await cursor.toArray();
            res.send(result);
        })

        //POST
        app.post("/allBookingInformation",async(req,res)=>{
            const information=req.body;
            const result=await allInformations.insertOne(information);
            res.json(result);
        })

        //DELETE
        app.delete("/boolingDelete/:id",async(req,res)=>{
            const id=req.params.id;
            const query={ _id: ObjectId(id)};
            const result=await allInformations.deleteOne(query);
            res.json(result);
        })

        //DELETE
        app.delete("/deleteBooking/:id",async(req,res)=>{
            const id=req.params.id;
            const query={ _id: ObjectId(id)};
            const result=await allInformations.deleteOne(query);
            res.json(result);
        })

       

    }
    finally{

    }
};
run().catch(console.dir)

app.listen(port,()=>{
    console.log("server is connect successfully",port)
})