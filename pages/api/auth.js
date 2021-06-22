// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {MongoClient} from "mongodb";
import {sha256} from 'js-sha256';
const mongo_url_main ="MONGO_DB_ADRESS";
function tokenHandler(email,password,type){
  
  if(type="generate"){
    const date=Date.now()
    const secretKey="SECRET"; 
    const longText=date.toString()+secretKey+email+password;
    const token=sha256(longText);
    return {token:token,tokenExpire:date+3600000}; 

    // const userToken=tokenHandler(request.username,request.password,"generate");
  }
  
  
}

async function LoginAPI(req,res){

  if(req.method==="POST"){
    const request=JSON.parse(req.body)
 // ----  REGISTER START -----
    if (request.type==="register"){
      const reqTest=JSON.stringify({  email:request.email, password:request.password,ad_soyad:request.ad_soyad,tc:request.tc,telefon:request.telefon,adres:request.adres,istek_listesi:[],siparisler:[],token:{token:"",tokenExpire:0}})
      const uri =mongo_url_main;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const doc = JSON.parse(reqTest);

      if(doc.password.length<8){
        
        res.status(400).json({message:"password is too weak"});
        return null
       }
        try{
          await client.connect();
          const database = client.db("alisveris_db");
          const movies = database.collection("uye");
          const finder=await movies.findOne({email:doc.email})
          if(!finder){
            const result = await movies.insertOne(doc);
            console.log(result.insertedCount);
            await client.close();
            res.status(201).json({message:"success"}); 
          }
          else{
            console.log("user already exist")
            await client.close();
           res.status(400).json({message:"user already exist"});
          }
         
        }
        catch(err){
          console.log(err.toString())
        }
    }
   
  
  // ----  REGISTER END -----
 // ----  LOGIN START -----
  if (request.type==="login"){
    const userToken=tokenHandler(request.email,request.password,"generate");
    const reqTest=JSON.stringify({ email:request.email, password:request.password,token:{token:userToken.token,tokenExpire:userToken.tokenExpire}});
    const uri =mongo_url_main;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const doc = JSON.parse(reqTest);
    try{
      await client.connect();
      const database = client.db("alisveris_db");
      const movies = database.collection("uye");
      const finder=await movies.findOne({email:doc.email,password:doc.password})
      if(!finder){
        console.log("wrong details");
        res.status(400).json({message:"Access Denied"});
      }
      else{
        console.log(finder);
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            token:{token:userToken.token,tokenExpire:userToken.tokenExpire}
          },
        };
        const result = await movies.updateOne(finder,updateDoc,options);
        res.status(201).json({token:userToken.token,expireTime:userToken.tokenExpire,tum:{...finder,password:"***",token:userToken.token,tokenExpire:userToken.tokenExpire},message:"Access Granted!"}); 
      }
    }

 catch(err){
          console.log(err.toString())
        }
        
  }


// ----  LOGIN END-----

// ----- AUTH START ----
if (request.type==="auth"){
  const date=Date.now();
  const reqTest=JSON.stringify({  email:request.email, password:request.password,ad_soyad:request.ad_soyad,tc:request.tc,telefon:request.telefon,adres:request.adres,istek_listesi:request.istek_listesi,siparisler:request.siparisler,token:request.token})
      const uri =mongo_url_main;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const doc = JSON.parse(reqTest);
 try{
      await client.connect();
      const database = client.db("alisveris_db");
      const movies = database.collection("uye");
      console.log(doc.token)
      const finder=await movies.findOne({ "token.token" :doc.token })
      if(!finder){
        console.log("wrong token");
        res.status(400).json({message:"Access Denied"});
        await client.close();
        return null
      }
      else if(finder.token.tokenExpire<date){
        console.log("token Expired");
        res.status(400).json({message:"Token Expired"});
        await client.close();
        return null
      }
      else if(finder.token.tokenExpire>date){
    const options = { upsert: true };
    if(doc.password!==undefined){
      const updateDoc = {
        $set: {
          email:doc.email,
          password:doc.password,
          ad_soyad:doc.ad_soyad,
          tc:doc.tc,
          telefon:doc.telefon,
          adres:doc.adres,
          istek_listesi:doc.istek_listesi,
          siparisler:doc.siparisler
  
        },
      };
      console.log(doc.password)
      const result = await movies.updateOne(finder, updateDoc, options);
      res.status(201).json({message:"Updated!"}); 
      await client.close();
    }
    else{
      const updateDoc = {
        $set: {
          email:doc.email,
          ad_soyad:doc.ad_soyad,
          tc:doc.tc,
          telefon:doc.telefon,
          adres:doc.adres,
          istek_listesi:doc.istek_listesi,
          siparisler:doc.siparisler
  
        },
      };
      console.log("null")
      const result = await movies.updateOne(finder, updateDoc, options);
      res.status(201).json({message:"Updated!"}); 
      await client.close();
    }
   
 

      }

}
catch(err){
  console.log(err.toString())
}
}

// ----- GET DATA ----
if (request.type==="getdata"){
  const reqTest=JSON.stringify({token:request.token});
  const uri =mongo_url_main;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const doc = JSON.parse(reqTest);
  try{
    await client.connect();
    const database = client.db("alisveris_db");
    const movies = database.collection("uye");
    console.log(doc.token)
    const finder=await movies.findOne({"token.token":doc.token})
    if(!finder){
      console.log("wrong details");
      res.status(400).json({message:"Access Denied"});
    }
    else{
      console.log(finder);
      res.status(201).json({tum:{...finder,password:"***"},message:"Access Granted!"}); 
    }
  }

catch(err){
        console.log(err.toString())
      }
      
}



// ----- LOGOUT START ----

if (request.type==="logout"){
  const reqTest=JSON.stringify({token:request.token})
  const uri =mongo_url_main;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const doc = JSON.parse(reqTest);
  try{
    await client.connect();
    const database = client.db("alisveris_db");
    const movies = database.collection("uye");
    const finder=await movies.findOne({ "token.token" :doc.token })
    if(!finder){
      console.log("wrong tokend");
      res.status(400).json({message:"Access Denied"});
      await client.close();
      return null
    }
    else{
      const options = { upsert: true };
    const updateDoc = {
      $set: {
        "token.token":"",
        "token.tokenExpire":0
      },
    };
    const result = await movies.updateOne(finder, updateDoc, options);
    res.status(201).json({message:"Logged Out"}); 
    await client.close();
    }

  }
  catch(err){
    console.log(err.toString())
  }
}


// ----- LOGOUT END ----

}
}

export default LoginAPI;