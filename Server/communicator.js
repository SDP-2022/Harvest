const { Client } = require('pg')
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
          }
      })

class communicator{
  constructor(){
    client.connect();
    return
  }

async endClient() { await client.end() }
  
//username String, email String, userID String
async addUser(username,email,userID){
  
  const text = `INSERT INTO "accounts"("Username","Email","User_ID","Date_Last_Accessed","Date_Joined") values($1,$2,$3,CURRENT_DATE,CURRENT_DATE) RETURNING *`;
  const values = []
  values.push(username);
  values.push(email);
  values.push(userID);
  
  
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
  
}

//userID String
async logUser(userID){
  const text = `UPDATE "accounts" SET "Date_Last_Accessed" = CURRENT_DATE WHERE "User_ID"= $1 RETURNING *`;
  const values = []
  values.push(userID);

  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
  
   
}

//userID String, food String
async getWeight(userID,food){
  const text = `SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2`;
  const values = []
  values.push(userID);
  values.push(food);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getHarvestLogs(userID){
  const text = `SELECT "Food_Name","Date_Logged","Weight" FROM "log" WHERE "User_ID" = $1`;
  const values = []
  values.push(userID);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

 
async addLog(userID,Food_Name,Weight){
  const text = `INSERT INTO "log"("User_ID","Food_Name","Date_Logged","Weight") values($1,$2,CURRENT_DATE,$3) RETURNING *`;
  const values = []
  values.push(userID);
  values.push(Food_Name);
  values.push(Weight);
  
  
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

//userID String, food String
async getAllFood(){
  const text = `SELECT "Food_Name" FROM "food"`;
  const values = []
  
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsType(foodType,userID,time,period){//eg Nut
  const text = `select "food"."Food_Name","log"."Weight","log"."Date_Logged", "food"."Subtype" from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" where "subtypes"."Type" = $1 and log."User_ID" = $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE;`;
  const values = []
  values.push(foodType);
  values.push(userID);
  values.push(time);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
async getLogsSuperType(foodSuperType,userID,time,period){//eg Fruit
  const text = `select "food"."Food_Name","log"."Weight","log"."Date_Logged", "subtypes"."Type" from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "types"."Supertype" = $1 and "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE;`;
  const values = []
  values.push(foodSuperType);
  values.push(userID);
  values.push(time);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsSubType(foodSubType,userID,time,period){//eg Almond
  const text = `SELECT "food"."Food_Name","log"."Weight","log"."Date_Logged" FROM "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" WHERE "food"."Subtype" = $1 AND "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE ;`;
  const values = []
  
  values.push(foodSubType);
  values.push(userID);
  values.push(time);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsSuperDuperType(userID,time,period){//eg Fruit
  const text = `select "food"."Food_Name","log"."Weight","log"."Date_Logged", "types"."Supertype" from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "log"."User_ID"= $1 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $2 * INTERVAL '1 ${period}' ) and CURRENT_DATE;`;
  const values = []
  values.push(userID);
  values.push(time);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
async getAllAtlas(foodName){
  const text = `SELECT * FROM "food" where "Food_Name" = $1`;
  const values = []
  values.push(foodName);
  
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}


}

module.exports=communicator;

/*
async function getstuff(){
  let com =new communicator;
  let aaaa=await com.getAllAtlas('Almond');
  console.log(aaaa.rows);
  await client.end();
  process.exit(1);
}
getstuff();*/

