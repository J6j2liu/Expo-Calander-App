// Example using Express.js
const express = require('express');
const cors = require('cors');
const app = express ();
app.use(express.json());
app.use(cors());

// const arr = new Array(31).fill(false);
let scheds = [];

const corsOptions = {
    origin: 'http://localhost:8081', // Replace with your frontend origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Example specifying the port and starting the server
const PORT = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    
    response.send(status);
});

// app.get("/cal", (request, response) => {
//     const status = JSON.stringify({
//         "arr": arr
//     });
//     response.send(status);
// });

// app.post("/cal", (request, response) => {
//     const payload = request.body;
//     const num = parseInt(payload.num);
//     arr[num] = !arr[num];

//     return response.sendStatus(200);
// });

app.post("/sched", (request, response) => {
    const payload = request.body;
    
    scheds.push({ 
        "data": payload.data, 
        "text": payload.text, 
        "title": payload.title,
        "year": payload.year,
        "month": payload.month,
    });

    return response.sendStatus(200);
});

app.get("/sched", (request, response) => {
    const status = JSON.stringify({
        "sched": scheds,
    });

    response.send(status);
});