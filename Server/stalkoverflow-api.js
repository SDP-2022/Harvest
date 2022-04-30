var validator = require('validator');

const Communicator = require('./communicator.js')
const dbCom = new Communicator();

function stalkoverflow() {
    return new StalkOverflowAPI();
}

class StalkOverflowAPI {
    parsePOSTRequest(req, res) {
        var reqType = req.get('RequestType');
        console.log("Request Type:", reqType);

        switch(reqType) {
            case 'AddUser':
                this.#addUser(req.body, res);
                return;
            case 'LoginUser':
                this.#logUser(req.body, res);
                return;
            case 'AddFoodLog':
                this.#addLog(req.body, res);
                return;
        }

        res.status(404);
        res.json({Error: "Unknown request type."});
    }

    parseGETRequest(req, res) {
        var reqType = req.get('RequestType');
        console.log("Request Type:", reqType);

        switch(reqType) {
            case 'GetHarvestLogs':
                this.#getHarvestLog(req, res);
                return;
            case 'GetFoodTotalWeight':
                this.#getFoodTotalWeight(req, res);
                return;
            case 'GetAllFoodNames':
                this.#getAllFoodNames(req, res);
                return;
        }

        res.status(404);
        res.json({Error: "Unknown request type."});
    }

    // POST REQUESTS
    async #addUser(body, res) {
        var userID;
        var username;
        var email;

        // Validate Request Parameters
        try {
            if(!(userID = body.UserID)) throw new Error("UserID not found.");
            if(!(username = body.Username)) throw new Error("Username not found.");
            if(!(email = body.Email)) throw new Error("Email not found.");          

            if (!(typeof userID === 'string')) throw new Error("Invalid UserID format.");
            if (!(typeof username === 'string')) throw new Error("Invalid Username format.");
            if (!validator.isEmail(email)) throw new Error("Invalid Email format.");

        } catch (err) {
            console.log(err.message);
            res.status(400);
            return res.json({Error : err.message});
        }

        // Send to database and check for errors
        try {
            var result = await dbCom.addUser(username, email, userID);
            console.log("Result:", result);
            res.status(201);
            res.send("Success");
        } catch (err) {
            console.log("Error:", err);
            res.status(500);
            return res.json({Error : err.detail});
        }
    }

    async #logUser(body, res) {
        var userID;

        try {
            if(!(userID = body.UserID)) throw new Error("UserID not found.");

            if (!(typeof userID === 'string')) throw new Error("Invalid UserID format.");

        } catch (err) {
            console.log(err.message);
            res.status(400);
            return res.json({Error : err.message});
        }

        // Send to database and check for errors
        try {
            var result = await dbCom.logUser(userID);
            console.log("Result:", result);

            if (result.rowCount == 0) {
                res.status(418);
                return res.json({});
            } else {
                res.status(201);
                res.send("Success");
            }           
        } catch (err) {
            console.log("Error:", err);
            res.status(500);
            return res.json({Error : err.detail});
        }
    }

    async #addLog(body, res) {
        var userID;
        var foodName;
        var weight;

        try {
            if(!(userID = body.UserID)) throw new Error("UserID not found.");
            if(!(foodName = body.FoodName)) throw new Error("FoodName param not found.");
            if(!(weight = body.Weight)) throw new Error("Weight param not found.");

            if (!(typeof userID === 'string')) throw new Error("Invalid UserID format.");
            if (!(typeof foodName === 'string')) throw new Error("Invalid FoodName format.");
            if ( !(typeof weight === 'number') || (!isFloat(weight) && !Number.isInteger(weight)) ) throw new Error("Invalid Weight format.");
        } catch (err) {
            console.log(err.message);
            res.status(400);
            return res.json({Error : err.message});
        }

        // Send to database and check for errors
        try {
            var result = await dbCom.addLog(userID, foodName, weight);
            console.log("Result:", result);

            if (result.rowCount == 0) {
                res.status(418);
                return res.json({});
            } else {
                res.status(201);
                res.send("Success");
            }           
        } catch (err) {
            console.log("Error:", err);
            res.status(500);
            return res.json({Error : err.detail});
        }
    }

    // GET REQUESTS
    async #getFoodTotalWeight(req, res) {
        var userID;
        var foodName;

        try {
            if(!(userID = req.get("UserID"))) throw new Error("UserID param not found.");
            if(!(foodName = req.get("FoodName"))) throw new Error("FoodName param not found.");

            if (!(typeof userID === 'string')) throw new Error("Invalid UserID format.");
            if (!(typeof foodName === 'string')) throw new Error("Invalid FoodName format.");
        } catch (err) {
            console.log(err.message);
            res.status(400);
            return res.json({Error : err.message});
        }

        // Send to database and check for errors
        try {
            var result = await dbCom.getWeight(userID, foodName);
            console.log("Result:", result);

            var weight = result.rows[0].sum;

            if (weight == null) {
                res.status(418);
                return res.json({});
            } else {
                res.status(201);
                res.json({
                    FoodName : foodName,
                    Weight : parseFloat(weight)
                });
            }           
        } catch (err) {
            console.log("Error:", err);
            res.status(500);
            return res.json({Error : err.detail});
        }
    }

    async #getHarvestLog(req, res) {
        var userID;

        try {
            if(!(userID = req.get("UserID"))) throw new Error("UserID param not found.");

            if (!(typeof userID === 'string')) throw new Error("Invalid UserID format.");
        } catch (err) {
            console.log(err.message);
            res.status(400);
            return res.json({Error : err.message});
        }

        // Send to database and check for errors
        try {
            var result = await dbCom.getHarvestLogs(userID);
            console.log("Result:", result);

            if (result.rowCount == 0) {
                res.status(418);
                return res.json({});
            } else {
                res.status(201);
                res.json(result.rows);
            }           
        } catch (err) {
            console.log("Error:", err);
            res.status(500);
            return res.json({Error : err.detail});
        }
    }

    async #getAllFoodNames(req, res) {
        try {
            var result = await dbCom.getAllFood();
            console.log("Result:", result);

            if (result.rowCount == 0) {
                res.status(418);
                return res.json({});
            } else {
                res.status(201);
                res.json(result.rows);
            }           
        } catch (err) {
            console.log("Error:", err);
            res.status(500);
            return res.json({Error : err.detail});
        }
    }
}

module.exports=stalkoverflow();

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}