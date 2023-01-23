const express = require('express');
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/gettemp",(req,res)=>{

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=bangkok&appid=7dc1b69f400c5398ee5a129bb7764c93&units=metric'
    https.get(url, (response)=>{
        console.log(response);
        console.log(response.statusCode); 
        
        response.on("data", (data)=>{
            let weatherData = JSON.parse(data)
            let imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.writeHead(200, {"Content-type": "text/html; charset=utf-8"})
            res.write("ณ จังหวัด "+weatherData.name+"</p>")
            res.write("มีอากาศ "+weatherData.main.temp+"</p>")
            res.write("สภาพอากาศในตอนนี้ "+weatherData.weather[0].description+"</p>");
            res.write("<img src="+imgURL+">");
            res.send();
        })
    });
});

app.get('/displaytemp', (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post('/displaytemp', (req,res)=>{
    const cityname = req.body.cityName
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid=7dc1b69f400c5398ee5a129bb7764c93&units=metric&lang=TH'
    https.get(url, (response)=>{
        console.log(response);
        console.log(response.statusCode); 
        
        response.on("data", (data)=>{
            let weatherData = JSON.parse(data)
            let imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.writeHead(200, {"Content-type": "text/html; charset=utf-8"})
            res.write("ณ จังหวัด "+weatherData.name+"</p>")
            res.write("มีอากาศ "+weatherData.main.temp+"</p>")
            res.write("สภาพอากาศในตอนนี้ "+weatherData.weather[0].description+"</p>");
            res.write("<img src="+imgURL+">");
            res.send();
        })
    });
})
app.listen(3000, ()=> {
    console.log ("Server is running on port 3000");
});
 