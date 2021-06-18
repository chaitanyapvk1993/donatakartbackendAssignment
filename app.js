
const https = require('https');
const express = require('express')
const app = express()
const port = 5023





https.get('https://testapi.donatekart.com/api/campaign', (resp) => {
  let data = '';


  resp.on('data', (chunk) => {
      
    data += chunk;
  });
  console.log("something");

  
  resp.on('end', () => {

    var compaigns=JSON.parse(data);
    console.log(compaigns[0])
    var s=compaigns.sort((a,b)=> (a.totalAmount < b.totalAmount ? 1 : -1))
    console.log(s[0]);
    var result=[];
   s.forEach(element => {
    var x={};
       x.tile=element.title;
       x.totalAmount=element.totalAmount;
       x.backersCount=element.backersCount;
       x.endDate=element.endDate;
       
       result.push(x);

       
        
    });
    console.log(result);
   // response.send(x);
   app.get('/getCompaigns', (req, res) => {
    res.send(result)
  })
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

   
  });

}).on("error", (err) => {
    console.log('error')
  console.log("Error: " + err.message);
});


