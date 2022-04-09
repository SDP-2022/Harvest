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
                return;
            case 'GetFoodTotalWeight':
                return;
        }

        res.status(404);
        res.json({Error: "Unknown request type."});
    }

    #addUser(body, res) {
        var userID;
        var username;
        var email;

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

        var result = dbCom.addUser(username, email, userID);
        console.log(result);

        res.status(201);
        res.send("Success");
    }

    #logUser(body, res) {
        var userID;

        try {
            if(!(userID = body.UserID)) throw new Error("UserID not found.");

            if (!(typeof userID === 'string')) throw new Error("Invalid UserID format.");

        } catch (err) {
            console.log(err.message);
            res.status(400);
            return res.json({Error : err.message});
        }

        res.status(201);
        res.send("Success");
    }
}

module.exports=stalkoverflow();