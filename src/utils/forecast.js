const request=require('request')
const forecast=(lat,long,callback)=>{
    const url='https://api.darksky.net/forecast/1a533605b456afbc85ed992897d017ab/'+lat+','+long+'?';
  
    request({url,json:true},(error,{ body})=>{
        if(error)
        {
            callback('Unable to connect',undefined);
        }
        else if(body.error){
             callback('Sorry,No data availabel',undefined)
        }
        else{
             
            callback(undefined,body.daily.data[0].summary+"IT is currently "+body.currently.temperature+"°F .There is a "+body.currently.precipProbability+"% chance of rain")
        }
    })
}

module.exports=forecast