require('dotenv').config();

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
//`SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2`
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
async getWeightOneLog(logID,food){
  const text = `SELECT SUM("Weight") FROM "log" WHERE "Log_ID" = $1 AND "Food_Name" = $2`;
  const values = []
  values.push(logID);
  values.push(food);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
//SELECT "Food_Name","Date_Logged","Weight", "Username" FROM "log" inner join "userlog" on log."Log_ID" = userlog."log_id" inner join "accounts" on accounts."User_ID" = userlog."user_id" WHERE "Log_ID" = '1';
async getHarvestLogs(userID){
  const text = `SELECT "Food_Name","Date_Logged","Weight" FROM "log" WHERE "User_ID"=$1`;
  const values = []
  values.push(userID);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getHarvestLogsOneLog(logID){
  const text = `SELECT "Food_Name","Date_Logged","Weight" FROM "log" WHERE "Log_ID"=$1`;
  const values = []
  values.push(logID);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogNames(userID){
  const text = `SELECT "Log_Name","log_id" FROM "userlog" WHERE "user_id" = $1`;
  const values = []
  values.push(userID);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

 
async addLog(userID,Food_Name,Weight,logID){
  const text = `INSERT INTO "log"("User_ID","Food_Name","Date_Logged","Weight","Log_ID") values($1,$2,CURRENT_DATE,$3,$4) RETURNING *`;
  const values = []
  values.push(userID);
  values.push(Food_Name);
  values.push(Weight);
  values.push(logID);
  
  
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async createLog(userID,logName){
  const text = `INSERT INTO "userlog"("user_id","Log_Name") values($1,$2) RETURNING *`;
  const values = []
  values.push(userID);
  values.push(logName);
  
  
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
//////////////////////////////////////////////////////////////////////////////////////////////
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

async getLogsFoodNameType(foodName,userID,time,period){//eg Almond
  const text = `SELECT "log"."Food_Name","log"."Weight","log"."Date_Logged" FROM "log" WHERE "log"."Food_Name" = $1 AND "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE ;`;
  const values = []
  
  values.push(foodName);
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
//////////////////////////////////////////////////////////////////////////////////////////////
async getLogsTypeOneLog(foodType,userID,time,period,logId){//eg Nut
  const text = `select "food"."Food_Name","log"."Weight","log"."Date_Logged", "food"."Subtype" from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" where "subtypes"."Type" = $1 and log."User_ID" = $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$4;`;
  const values = []
  values.push(foodType);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
async getLogsSuperTypeOneLog(foodSuperType,userID,time,period,logId){//eg Fruit
  const text = `select "food"."Food_Name","log"."Weight","log"."Date_Logged", "subtypes"."Type" from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "types"."Supertype" = $1 and "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$4;`;
  const values = []
  values.push(foodSuperType);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsSubTypeOneLog(foodSubType,userID,time,period,logId){//eg Almond
  const text = `SELECT "food"."Food_Name","log"."Weight","log"."Date_Logged" FROM "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" WHERE "food"."Subtype" = $1 AND "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$4;`;
  const values = []
  
  values.push(foodSubType);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsFoodNameTypeOneLog(foodName,userID,time,period,logId){//eg Almond
  const text = `SELECT "log"."Food_Name","log"."Weight","log"."Date_Logged" FROM "log" WHERE "log"."Food_Name" = $1 AND "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$4;`;
  const values = []
  
  values.push(foodName);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsSuperDuperTypeOneLog(userID,time,period,logId){//eg Fruit
  const text = `select "food"."Food_Name","log"."Weight","log"."Date_Logged", "types"."Supertype" from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "log"."User_ID"= $1 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $2 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$3;`;
  const values = []
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
////////////////////////////////////////////////////////////////////////////////
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
async getHarvestLogsTotalWeight(userID,foodname){
  const text = `SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2 AND "Date_Logged" between CURRENT_DATE + (-1* INTERVAL '1 year') and CURRENT_DATE;`;
  const values = []
  values.push(userID);
  values.push(foodname);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
async getHarvestLogsTotalWeightOneLog(userID,foodname,logID){
  const text = `SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2 AND "Date_Logged" between CURRENT_DATE + (-1* INTERVAL '1 year') and CURRENT_DATE AND "Log_ID"=$3;`;
  const values = []
  values.push(userID);
  values.push(foodname);
  values.push(logID);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
///////////////////////////////////////////////////////////////////////
async getLogsSubTypeGroup(foodSubType,userID,time,period){//eg Almond
  const text = `SELECT "food"."Food_Name",sum("log"."Weight") FROM "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" WHERE "food"."Subtype" = $1 AND "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE GROUP BY  "food"."Food_Name";`;
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
async getLogsTypeGroup(foodType,userID,time,period){//eg Nut
  const text = `select "food"."Subtype", sum("log"."Weight") from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" where "subtypes"."Type" = $1 and log."User_ID" = $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE GROUP BY  "food"."Subtype";`;
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

async getLogsSuperTypeGroup(foodSuperType,userID,time,period){//eg Fruit
  const text = `select "subtypes"."Type",sum("log"."Weight") from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "types"."Supertype" = $1 and "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE  GROUP BY "subtypes"."Type";`;
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

async getLogsSuperDuperTypeGroup(userID,time,period){
  const text = `select "types"."Supertype",sum("log"."Weight") from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "log"."User_ID"= $1 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $2 * INTERVAL '1 ${period}' ) and CURRENT_DATE GROUP BY "types"."Supertype";`;
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
///////////////////////////////////////////////////////////////////
async getLogsSubTypeGroupOneLog(foodSubType,userID,time,period,logId){//eg Almond
  const text = `SELECT "food"."Food_Name",sum("log"."Weight") FROM "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" WHERE "food"."Subtype" = $1 AND "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE  AND "log"."Log_ID"=$4 GROUP BY  "food"."Food_Name";`;
  const values = []
  
  values.push(foodSubType);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
async getLogsTypeGroupOneLog(foodType,userID,time,period,logId){//eg Nut
  const text = `select "food"."Subtype", sum("log"."Weight") from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" where "subtypes"."Type" = $1 and log."User_ID" = $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$4 GROUP BY  "food"."Subtype";`;
  const values = []
  values.push(foodType);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsSuperTypeGroupOneLog(foodSuperType,userID,time,period,logId){//eg Fruit
  const text = `select "subtypes"."Type",sum("log"."Weight") from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "types"."Supertype" = $1 and "log"."User_ID"= $2 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $3 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$4 GROUP BY "subtypes"."Type";`;
  const values = []
  values.push(foodSuperType);
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}

async getLogsSuperDuperTypeGroupOneLog(userID,time,period,logId){
  const text = `select "types"."Supertype",sum("log"."Weight") from "food" inner join "log" on "food"."Food_Name" = "log"."Food_Name" inner join "subtypes" on "food"."Subtype" = "subtypes"."Subtype" inner join "types" on "types"."Type" = "subtypes"."Type" where "log"."User_ID"= $1 AND "log"."Date_Logged" between CURRENT_DATE + (-1* $2 * INTERVAL '1 ${period}' ) and CURRENT_DATE AND "log"."Log_ID"=$3 GROUP BY "types"."Supertype";`;
  const values = []
  values.push(userID);
  values.push(time);
  values.push(logId);
  try{
    var result=await client.query(text, values);
    return result;
  }catch(err){
    throw err;
  }
}
///////////////////////////////////////////////////////////////////
}

module.exports=communicator;

/*
async function getstuff(){
  let com =new communicator;
  let aaaa=await com.getLogsSuperDuperTypeGroupOneLog('A1',1,'year',7);
  console.log(aaaa.rows);
  await client.end();
  process.exit(1);
}
getstuff();
*/
