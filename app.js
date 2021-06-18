
const https = require('https');
const express = require('express')
const app = express()
const port = 5025





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
       //console.log(x.endDate.toLocaleString())

       
        
    });
    var result1=[]
    //var dat=Date.today().add(-30).days()
    var today = new Date()
    console.log(today);
    var tod=new Date()
    tod.setDate(tod.getDate() - 30); 

//var priorDate = new Date().setDate(today.getDate()-30)
var last30DaysDate = tod;

    //console.log(last30DaysDate==today);
    compaigns.forEach(element => {
       // console.log(typeof new Date(element.endDate))
        var x={};
        
        //console.log("somethingejejejeje")
           if(new Date(element.endDate)>=today&&new Date(element.created)>=last30DaysDate)
           {
               result1.push(element.ngoCode);
              // console.log()
           }
           
         //  result.push(x);
           //console.log(x.endDate.toLocaleString())
    
           
            
        });
        var result2=[]
        compaigns.forEach(element => {
            // console.log(typeof new Date(element.endDate))
             var x={};
             
             //console.log("somethingejejejeje")
                if((new Date(element.endDate)<today)||(element.procuredAmount>element.totalAmount))
                {
                    result2.push(element.ngoCode);
                }
                
              //  result.push(x);
                //console.log(x.endDate.toLocaleString())
         
                
                 
             });
  
   
    


//console.log("the resultis :"+result1);


    //console.log(result);
   // response.send(x);
   app.get('/getCompaigns', (req, res) => {
    res.send(result)
  })
  app.get('/getActiveCompaigns', (req, res) => {
    res.send(result1)
  })
  app.get('/getInActiveCompaigns', (req, res) => {
    res.send(result2)
  })
  

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

   
  });

}).on("error", (err) => {
    console.log('error')
  console.log("Error: " + err.message);
});


