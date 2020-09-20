 const readFile=(fileR,fp)=>{
    let dataObj
    fileR.readFile(fp,(err,data)=>{
        if(err) throw err
        dataObj=JSON.parse(data)
    })
    return dataObj
}

const writeFile=(fileR,fp,data)=>{
    
    const datavar = "let data="+JSON.stringify(data)+"\n \n"+"module.exports=data"
    
    fileR.writeFile(fp,datavar,'utf-8',(err)=>{
        if(err) throw err
        console.log('Succesful Async write')
    })
}

const searchFl=(finData,reqData,key1,key2)=>{
    
    let flagB=false
    let ind=-1
    finData["data"].map((elem,index)=>{
        if(elem[key1][key2]==reqData[key1][key2]){
            flagB=true
            ind=index
            console.log(elem[key1][key2]+ '- ' +reqData[key1][key2] )
        }
    })
    return {flag:flagB,index:ind}
}

const idGen=(crypto)=>{
    let currda=(new Date()).valueOf().toString();
    let randnum=Math.random().toString()
    let hashval=crypto.createHash('sha256').update(currda+randnum).digest('hex')
    return hashval
}

module.exports={
    readFile:readFile,
    writeFile:writeFile,
    idGen:idGen,
    searchFl:searchFl
}