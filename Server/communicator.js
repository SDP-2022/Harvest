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
addUser(username,email,userID){
  
  const text = `INSERT INTO "accounts"("Username","Email","User_ID","Date_Last_Accessed","Date_Joined") values($1,$2,$3,CURRENT_DATE,CURRENT_DATE) RETURNING *`;
  const values = []
  values.push(username);
  values.push(email);
  values.push(userID);
  client.query(text, values, (err, res) => {
    if (err) {
      //console.log(err.stack);
      return err;
    } else {
      //console.log(res.rows[0]);
      //console.log('user added');
      return res.rows;
    }
    
  }) 
}

//userID String
logUser(userID){
  const text = `UPDATE "accounts" SET "Date_Last_Accessed" = CURRENT_DATE WHERE "User_ID"= $1 RETURNING *`;
  const values = []
  values.push(userID);
  client.query(text, values, (err, res) => {
    if (err) {
      //console.log(err.stack);
      return err;
    } else {
      //console.log(res.rows[0]);
      //console.log('ACCESS UPDATED');
      return res.rows;
    }
    
  }) 
}

//userID String, food String
getWeight(userID,food){
  const text = `SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2`;
  const values = []
  values.push(userID);
  values.push(food);
  client.query(text, values, (err, res) => {
    if (err) {
      //console.log(err.stack);
      return err;
    } else {
      //onsole.log(res.rows[0]);
      //console.log('food added');
      return res.rows;
      
    }
    
  }) 
}


 





}

module.exports=communicator;