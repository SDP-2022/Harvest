class communicator{
  constructor(){
    const { Client } = require('pg')
    const connectionString = process.env.DATABASE_URL;
    this.client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
          }
      })
  }
  
  
  


//username String, email String, userID String
addUser(username,email,userID){
  this.client.connect();
  const text = `INSERT INTO "accounts"("Username","Email","User_ID","Date_Last_Accessed","Date_Joined") values($1,$2,$3,CURRENT_DATE,CURRENT_DATE) RETURNING *`;
  const values = []
  values.push(username);
  values.push(email);
  values.push(userID);
  this.client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
      return err.stack
    } else {
      console.log(res.rows[0]);
      console.log('user added');
      return res.rows;
    }
    this.client.end();
  }) 
}

//userID String
logUser(userID){
  this.client.connect();
  const text = `UPDATE "accounts" SET "Date_Last_Accessed" = CURRENT_DATE WHERE "User_ID"= $1 RETURNING *`;
  const values = []
  values.push(userID);
  this.client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
      return err.stack
    } else {
      console.log(res.rows[0]);
      console.log('ACCESS UPDATED');
      return res.rows;
    }
    this.client.end();
  }) 
}

//userID String, food String
getWeight(userID,food){
  this.client.connect();
  const text = `SELECT SUM("Weight") FROM "log" WHERE "User_ID" = $1 AND "Food_Name" = $2`;
  const values = []
  values.push(userID);
  values.push(food);
  this.client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
      return err.stack
    } else {
      console.log(res.rows[0]);
      console.log('food added');
      return res.rows;
      
    }
    this.client.end();
  }) 
}


 





}

module.exports=communicator;