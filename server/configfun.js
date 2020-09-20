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

const beautify=(data)=>{
    let datastr=JSON.stringify(data).replace(/{/g,"\n \t { \n \t \t")
    datastr=datastr.replace(/}/g,"\n \t  }")
    return datastr
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
    idGen:idGen
}