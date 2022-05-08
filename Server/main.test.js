require('dotenv').config()
const { mockRequest, mockResponse } = require('mock-req-res')
const api = require('./stalkoverflow-api');

// Registering
test('Registering duplicate user.', async () => {
    const RequestType = "AddUser";
    const UserID = "A1";
    const Username = "Zidan";
    const Email = "zidan@harvest.com";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Username, Email}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(500);
    expect(json.Error).toEqual(`Key ("User_ID")=(A1) already exists.`);
});

test('Registering without UserID.', async () => {
    const RequestType = "AddUser";
    const UserID = "A1";
    const Username = "Zidan";
    const Email = "zidan@harvest.com";

    var req = mockRequest({
        headers: { RequestType },
        body: {Username, Email}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`UserID not found.`);
});

test('Registering without Username.', async () => {
    const RequestType = "AddUser";
    const UserID = "A1";
    const Username = "Zidan";
    const Email = "zidan@harvest.com";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Email}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Username not found.`);
});

test('Registering without email.', async () => {
    const RequestType = "AddUser";
    const UserID = "A1";
    const Username = "Zidan";
    const Email = "zidan@harvest.com";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Username}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Email not found.`);
});

test('Registering with invalid UserID.', async () => {
    const RequestType = "AddUser";
    const UserID = 42;
    const Username = "Zidan";
    const Email = "zidan@harvest.com";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Username, Email}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid UserID format.`);
});

test('Registering with invalid Username.', async () => {
    const RequestType = "AddUser";
    const UserID = "A1";
    const Username = 42;
    const Email = "zidan@harvest.com";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Username, Email}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid Username format.`);
});

test('Registering with invalid Email.', async () => {
    const RequestType = "AddUser";
    const UserID = "A1";
    const Username = "Zidan";
    const Email = "Zidan";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Username, Email}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid Email format.`);
});

// Login
test('User login.', async () => {
    const RequestType = "LoginUser";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const send = res.send.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(send).toEqual("Success");
});

test('User login without UserID.', async () => {
    const RequestType = "LoginUser";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType },
        body: {}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`UserID not found.`);
});

test('User login with invalid UserID.', async () => {
    const RequestType = "LoginUser";
    const UserID = 42;

    var req = mockRequest({
        headers: { RequestType },
        body: { UserID }
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid UserID format.`);
});

test('Invalid user login.', async () => {
    const RequestType = "LoginUser";
    const UserID = "HAHAHAHAH";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json.Error).toEqual(undefined);
});

// Adding log
test('Add invalid harvest log.', async () => {
    const RequestType = "AddFoodLog";
    const UserID = "A1";
    const FoodName = "Car";
    const Weight = 420;

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(500);
    expect(json.Error).toEqual(`Key (Food_Name)=(Car) is not present in table \"food\".`);
});

test('Add harvest log without UserID', async () => {
    const RequestType = "AddFoodLog";
    const UserID = "A1";
    const FoodName = "Car";
    const Weight = 420;

    var req = mockRequest({
        headers: { RequestType },
        body: {FoodName, Weight}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`UserID not found.`);
});

test('Add harvest log without FoodName', async () => {
    const RequestType = "AddFoodLog";
    const UserID = "A1";
    const FoodName = "Car";
    const Weight = 420;

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, Weight}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`FoodName param not found.`);
});

test('Add harvest log without Weight', async () => {
    const RequestType = "AddFoodLog";
    const UserID = "A1";
    const FoodName = "Car";
    const Weight = 420;

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Weight param not found.`);
});

test('Add harvest log with invalid UserID.', async () => {
    const RequestType = "AddFoodLog";
    const UserID = 42;
    const FoodName = "Car";
    const Weight = 420;

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid UserID format.`);
});

test('Add harvest log with invalid FoodName.', async () => {
    const RequestType = "AddFoodLog";
    const UserID = "A1";
    const FoodName = 42;
    const Weight = 420;

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid FoodName format.`);
});

test('Add harvest log with invalid Weight.', async () => {
    const RequestType = "AddFoodLog";
    const UserID = "A1";
    const FoodName = "Car";
    const Weight = "Jeff Bezos";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid Weight format.`);
});


// Get Harvest Logs
test('Get all harvest logs of a user.', async () => {
    const RequestType = "GetHarvestLogs";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType, UserID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(json.length).toEqual(36);
});

test('Get all harvest logs without UserID.', async () => {
    const RequestType = "GetHarvestLogs";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`UserID param not found.`);
});

test('Get all harvest logs with invalid UserID.', async () => {
    const RequestType = "GetHarvestLogs";
    const UserID = 42;

    var req = mockRequest({
        headers: { RequestType, UserID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid UserID format.`);
});

test('Get all harvest logs of nonexistent user.', async () => {
    const RequestType = "GetHarvestLogs";
    const UserID = "HAHAHAHAH";

    var req = mockRequest({
        headers: { RequestType, UserID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json).toEqual({});
});

// Get total weight
test('Get total weight of a certain food.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(json.Weight).toEqual(38.59);
});

test('Get total weight without UserID.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, FoodName },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`UserID param not found.`);
});

test('Get total weight without Foodname.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`FoodName param not found.`);
});

test('Get total weight without Foodname.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`FoodName param not found.`);
});

test('Get total weight with invalid UserID.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = 42;
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid UserID format.`);
});

test('Get total weight with invalid FoodName.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "A1";
    const FoodName = 42;

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid FoodName format.`);
});

test('Get total weight for non-existent user.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "HAHAHAHHA";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json).toEqual({});
});

// Get all food names
test('Get all food names.', async () => {
    const RequestType = "GetAllFoodNames";

    var req = mockRequest({
        headers: { RequestType},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(json.length).toEqual(94);
});

// Get Filtered Logs
test('Get filtered harvest logs without UserID.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`UserID param not found.`);
});

test('Get filtered harvest logs without Time.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Time param not found.`);
});

test('Get filtered harvest logs without Period.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Period param not found.`);
});

test('Get filtered harvest logs without Level.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Level param not found.`);
});

test('Get filtered harvest logs without Produce.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Produce param not found.`);
});

test('Get filtered harvest logs with invalid UserID.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = 42;
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid UserID format.`);
});

test('Get filtered harvest logs with invalid Time.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = "poliwag";
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Time param not found.`);
});

test('Get filtered harvest logs with invalid Period.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 42;
    const Period = 42;
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid Period format.`);
});

test('Get filtered harvest logs with invalid Level.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 42;
    const Period = "month";
    const Level = "kangaroo";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid Level format.`);
});

test('Get filtered harvest logs with invalid Level.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 42;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = 42;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual(`Invalid Produce format.`);
});

test('Get superdupertype harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"April":{"Fruit":43.36},"May":{"Vegetable":1530,"Flower":257,"Herb":354,"Fruit":1375.0900000000001}}`);
});

test('Get supertype harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "supertype";
    const Produce = "Fruit";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    console.log(JSON.stringify(json));

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"April":{"Citrus":43.36},"May":{"Stone Fruit":700,"Pome Fruit":295,"Citrus":80.09,"Nut":300}}`);
});

test('Get non-existent supertype produce harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 1;
    const Period = "day";
    const Level = "supertype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json).toEqual({});
});

test('Get type harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "type";
    const Produce = "Citrus";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"April":{"Lemon":28.59,"Lime":14.77},"May":{"Orange":70.09,"Lemon":10}}`);
});

test('Get non-existent type produce harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 1;
    const Period = "day";
    const Level = "type";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json).toEqual({});
});

test('Get subtype harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "subtype";
    const Produce = "Orange";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    console.log(JSON.stringify(json));

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"May":{"Orange (Valencia)":70.09}}`);
});

test('Get non-existent subtype produce harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 1;
    const Period = "day";
    const Level = "subtype";
    const Produce = "HAHAHAHAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json).toEqual({});
});

test('Invalid POST request type.', async () => {
    const RequestType = "Lmao";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(404);
    expect(json.Error).toEqual("Unknown request type.");
});

test('Invalid GET request type.', async () => {
    const RequestType = "Lmao";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType, UserID }
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(404);
    expect(json.Error).toEqual("Unknown request type.");
});

afterAll(async () => {
    await api.endClient();
});