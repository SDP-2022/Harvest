const { mockRequest, mockResponse } = require('mock-req-res')
const api = require('./stalkoverflow-api');

// Suppress logs for now lol
console.log = function() {}

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
    const LogID = "7";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight, LogID}
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
    const LogID = "7";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight, LogID}
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
    const LogID = "7";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight, LogID}
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
    const LogID = "7";

    var req = mockRequest({
        headers: { RequestType },
        body: {UserID, FoodName, Weight, LogID}
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
    expect(json.length).toEqual(47);
});

test('Get all harvest logs of a log.', async () => {
    const RequestType = "GetHarvestLogs";
    const UserID = "A1";
    const LogID = "7";

    var req = mockRequest({
        headers: { RequestType, UserID, LogID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(json.length).toEqual(8);
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
test('Get total weight of a certain food, all logs.', async () => {
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

test('Get total weight of a certain food, one log.', async () => {
    const RequestType = "GetFoodTotalWeight";
    const UserID = "A1";
    const FoodName = "Lime";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName, LogID },
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(json.Weight).toEqual(96);
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

test('Get filtered harvest logs with invalid Produce.', async () => {
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
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":4062.09,"April":43.36,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
});

test('Get superdupertype harvest logs for single log.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHAHAHAHA";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":246,"April":0,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
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

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":1599.09,"April":43.36,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
});

test('Get supertype harvest logs for single log.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "supertype";
    const Produce = "Fruit";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":124,"April":0,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
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
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":276.09000000000003,"April":43.36,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
});

test('Get type harvest logs for single log.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "type";
    const Produce = "Citrus";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":96,"April":0,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
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

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":70.09,"April":0,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
});

test('Get subtype harvest logs of single log.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "subtype";
    const Produce = "Lime";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":96,"April":0,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
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

test('Get foodname produce harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "foodname";
    const Produce = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":10,"April":28.59,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
});

test('Get foodname produce harvest logs for single log.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "foodname";
    const Produce = "Lime";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"June":0,"May":96,"April":0,"March":0,"February":0,"January":0,"December":0,"November":0,"October":0,"September":0,"August":0,"July":0}`);
});

test('Get non-existent foodname produce harvest logs.', async () => {
    const RequestType = "GetFilteredLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "foodname";
    const Produce = "SuckThisLemon";

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

test('Get logs total weight for foodname.', async () => {
    const RequestType = "GetLogsTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    console.log(JSON.stringify(json))

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"sum":"38.59"}`);
});

test('Get logs total weight for foodname for single log.', async () => {
    const RequestType = "GetLogsTotalWeight";
    const UserID = "A1";
    const FoodName = "Lime";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, FoodName, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    console.log(JSON.stringify(json))

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"sum":"96.00"}`);
});

test('Get logs total weight for foodname with no UserID.', async () => {
    const RequestType = "GetLogsTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, FoodName},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(JSON.stringify(json)).toEqual(`{"Error":"UserID param not found."}`);
});

test('Get logs total weight for foodname with no FoodName.', async () => {
    const RequestType = "GetLogsTotalWeight";
    const UserID = "A1";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, UserID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(JSON.stringify(json)).toEqual(`{"Error":"FoodName param not found."}`);
});

test('Get Atlas Page Data.', async () => {
    const RequestType = "GetAtlas";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType, FoodName},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json)).toEqual(`{"Food_Name":"Lemon","Description":"When life gives you lemons, plant the seeds and grow more! This citrus fruit is known for its distinct yellow colour and sour taste. Rich in vitamin C, lemons are perfect in lemonade, in a salad dressing","Image":"https://www.checkers.co.za/medias/10603101KG-20190726-Media-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wyMTQzODZ8aW1hZ2UvcG5nfGltYWdlcy9oNDIvaDFhLzg4NjAxNDU1NDkzNDIucG5nfDViN2EyMzFkOTRiODlhODdlMDllOWE0MWExZTY5YmM5YjA3NGY4ZDA5ZGIxYWEyODRlOWEwZjZlNTBjMTIzMzU","Calories":113,"pH":"Neutral","Sun":"Full Sun","Harvest_Time":"Winter","Sow_Time":"N/A","Plant_Time":"Early Spring","Subtype":"Lemon"}`);
});

test('Get Atlas Page Data with no FoodName.', async () => {
    const RequestType = "GetAtlas";
    const FoodName = "Lemon";

    var req = mockRequest({
        headers: { RequestType},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(JSON.stringify(json)).toEqual(`{"Error":"FoodName param not found."}`);
});

test('Get Atlas Page Data with invalid FoodName.', async () => {
    const RequestType = "GetAtlas";
    const FoodName = 420;

    var req = mockRequest({
        headers: { RequestType, FoodName},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(JSON.stringify(json)).toEqual(`{"Error":"Invalid FoodName format."}`);
});

test('Get Atlas Page Data for non-existent FoodName.', async () => {
    const RequestType = "GetAtlas";
    const FoodName = "420";

    var req = mockRequest({
        headers: { RequestType, FoodName},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(418);
    expect(json).toEqual({});
});

test('Get Log Names.', async () => {
    const RequestType = "GetLogNames";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType, UserID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(json).toEqual([{"Log_Name": "Eden", "log_id": 22}, {"Log_Name": "My Garden", "log_id": 1}, {"Log_Name": "Plantopia", "log_id": 7}, {"Log_Name": "Unova", "log_id": 23}, {"Log_Name": "Garden of Words", "log_id": 24}]);
});

test('Create log without name.', async () => {
    const RequestType = "CreateLog";
    const UserID = "A1";

    var req = mockRequest({
        headers: { RequestType},
        body : {UserID}
    });

    var res = mockResponse();

    await api.parsePOSTRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(400);
    expect(json.Error).toEqual("LogName not found.");
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

// Piechart Logs (Grouped)
test('Get piechart logs, subtype group.', async () => {
    const RequestType = "GetPiechartLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "subtype";
    const Produce = "Lime";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Food_Name":"Lime","sum":"210.77"}`);
});

test('Get piechart logs, subtype group for single log.', async () => {
    const RequestType = "GetPiechartLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "subtype";
    const Produce = "Lime";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Food_Name":"Lime","sum":"96.00"}`);
});

test('Get piechart logs, type group.', async () => {
    const RequestType = "GetPiechartLogs";
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
    expect(JSON.stringify(json[0])).toEqual(`{"Subtype":"Lemon","sum":"38.59"}`);
});

test('Get piechart logs, type group for single log.', async () => {
    const RequestType = "GetPiechartLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "type";
    const Produce = "Citrus";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Subtype":"Lime","sum":"96.00"}`);
});

test('Get piechart logs, supertype group.', async () => {
    const RequestType = "GetPiechartLogs";
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

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Type":"Citrus","sum":"319.45"}`);
});

test('Get piechart logs, supertype group for single log.', async () => {
    const RequestType = "GetPiechartLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "supertype";
    const Produce = "Fruit";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Type":"Citrus","sum":"96.00"}`);
});

test('Get piechart logs, superdupertype group.', async () => {
    const RequestType = "GetPiechartLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHA";

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Supertype":"Vegetable","sum":"1583.00"}`);
});

test('Get piechart logs, superdupertype group fro single log.', async () => {
    const RequestType = "GetPiechartLogs";
    const UserID = "A1";
    const Time = 32;
    const Period = "month";
    const Level = "superdupertype";
    const Produce = "HAHA";
    const LogID = 7;

    var req = mockRequest({
        headers: { RequestType, UserID, Time, Period, Level, Produce, LogID},
    });

    var res = mockResponse();

    await api.parseGETRequest(req, res);

    const status = res.status.getCall(0).args[0];
    const json = res.json.getCall(0).args[0];

    expect(status).toEqual(201);
    expect(JSON.stringify(json[0])).toEqual(`{"Supertype":"Flower","sum":"69.00"}`);
});

afterAll(async () => {
    await api.endClient();
});