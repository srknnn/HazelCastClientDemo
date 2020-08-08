var path =require('path');

module.exports.index=(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
};

module.exports.bilgisayar =(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
};