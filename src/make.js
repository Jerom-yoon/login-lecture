const fs = require('fs')
fs.writeFile('./sample.txt','hello world', function(err){
    if(err) throw err
    console.log('file created')
})
console.log('file creating!')