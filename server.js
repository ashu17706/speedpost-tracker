const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.set("port", process.env.PORT || 3001);


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log('hi');    
    return res.send('hi');
});

app.post("/api",(req,res) => {
    console.log('hi');
    let reqBody = req.body;
    const consignmentNo = reqBody.tracker_id;//ED196345405IN
    const courier_type = reqBody.tracking_type;
    if (courier_type == "INDIA_POST") {
        const india_post = require('./app/india_post');
        india_post.fetchIndiaPost(consignmentNo).then(function(data){
            console.log('done');
            console.log(data);
            return res.json({
                'response': true,
                'status': data
            });
        });        
    }else{
        return res.json({
            'response': false,
            'status': "Invalid Courier Selected"
        });
    }  
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
