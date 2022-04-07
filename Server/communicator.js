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
    return
  }
  
  
  


//username String, email String, userID String
addUser(username,email,userID){
  client.connect();
  const text = `INSERT INTO "accounts"("Username","Email","User_ID","Date_Last_Accessed","Date_Joined") values($1,$2,$3,CURRENT_DATE,CURRENT_DATE) RETURNING *`;
  const values = []
  values.push(username);
  values.push(email);
  values.push(userID);
  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
      client.end();
      return err.stack;
    } else {
      console.log(res.rows[0]);
      console.log('user added');
      client.end();
      return res.rows;
    }
    
  }) 
}

//userID String
logUser(userID){
  client.connect();
  const text = `UPDATE "accounts" SET "Date_Last_Accessed" = CURRENT_DATE WHERE "User_ID"= $1 RETURNING *`;
  const values = []
  values.push(userID);
  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
      client.end();
      return err.stack;
    } else {
      console.log(res.rows[0]);
      console.log('ACCESS UPDATED');
      client.end();
      return res.rows;
    }
    
  }) 
}

//userID String, food String
getWeight(userID,food){
  client.connect();
  const text = `SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2`;
  const values = []
  values.push(userID);
  values.push(food);
  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
      client.end();
      return err.stack
    } else {
      console.log(res.rows[0]);
      console.log('food added');
      client.end();
      return res.rows;
      
    }
    
  }) 
}


 





}

module.exports=communicator;