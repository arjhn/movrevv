const express=require('express');
const bodyParser=require('body-parser');
const crypto=require('crypto');
const fileR=require('fs');

const configfun=require('./configfun')

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  
})

/**app.get('/',(req,res)=>{
    console.log(configfun.idGen(crypto))
    res.send('hello')
})**/

app.post('/postreview',(req,res)=>{
    
    
    req.body.payL['id']['mid']=configfun.idGen(crypto)
    
    let dataObj=JSON.
        parse(fileR.readFileSync('./data.json'))
    dataObj['data']
        .push(req.body.payL)
    
    let data=JSON.stringify(dataObj,null,4)
    fileR.writeFileSync('./data.json',data)
    
    res.json({status:true})
})

const listener=app.listen(8001,()=>{
    console.log('App is starting')
})
