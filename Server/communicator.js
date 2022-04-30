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
  }catch{
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
  }catch{
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
  }catch{
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
async getAllFood(userID,food){
  const text = `SELECT "Food" FROM "food"`;
  const values = []
  values.push(userID);
  values.push(food);
  try{
    var result=await client.query(text, values);
    return result;
  }catch{
    throw err;
  }
}

async getLogsSuperType(foodType){
  const text = `SELECT food."Food_Name" FROM "food" inner join "subtypes" on food."Subtype" = subtypes."Subtype" where subtypes."Type" = $1`;
  const values = []
  values.push(foodType);
  try{
    var result=await client.query(text, values);
    return result;
  }catch{
    throw err;
  }
}

}

module.exports=communicator;





