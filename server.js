/** csv file
a,b,c
1,2,3
4,5,6
*/
const config=require('./config.json')
const csvFilePath=config.filepath
const csv=require('csvtojson')
const express = require('express')
const firstline = require('firstline')
const app = express()
const port = config.port
const this_res_column = {}
// Async / await usage
async function read(){
	try{
		let res = await csv().fromFile(csvFilePath);
   		return res;
	}catch(err){
		console.log("errpr")
	}
}

function parseColumn(str){
	result = [];
        strs = str.split(',')
	strs.forEach((obj)=>{
		result.push({
			"name":obj,
			"type":"string",
			"friendly_name":obj
		})
	})
	return result;
}

app.get('*', async (request, response) => {
   try{
   let firstline2 = await firstline(csvFilePath);
   let res_column = parseColumn(firstline2)
   let res_row = await read()
   let res = {
      "columns":res_column,
      "rows":res_row
   }
//   console.log(res)
   response.json(res)
 } catch (e) {
    //this will eventually be handled by your error handling middleware
    console.log(e) 
}
//   response.send('Hello from Express!')
})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

