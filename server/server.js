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

app.post('/postreview',(req,res)=>{
    
    let dataObj=JSON.
        parse(fileR.readFileSync('./data.json'))
    let flagObj=configfun.
        searchFl(dataObj,req.body.payL,'id','imdb')
    
    if(flagObj.flag==true){
        console.log('exist'+flagObj.index)
        req.body.payL['id']['mid']=dataObj['data'][flagObj.index]['id']['mid']
        dataObj['data'][flagObj.index]=req.body.payL  
    }        
    else{
        console.log('doesnt exist')
        req.body.payL['id']['mid']=configfun.idGen(crypto)
        dataObj['data'].push(req.body.payL)
    }
        
    let data=JSON.stringify(dataObj,null,4)
    fileR.writeFileSync('./data.json',data)
    
    res.json({status:true})
})

app.get('/getAll',(req,res)=>{
    let dataObj=JSON.
        parse(fileR.readFileSync('./data.json'))
    res.send(dataObj['data'])

})

const listener=app.listen(8001,()=>{
    console.log('App is starting')
})
