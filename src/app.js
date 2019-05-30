//In this we gonna use express.js ,which help us to interact with user on static websites
const path=require('path')
const express =require('express')
const hbs=require('hbs')


//import file from utils
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

//Define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')//path for res.send
const viewsPath=path.join(__dirname,'../templates/views')//for handlerbar path
const partialPath=path.join(__dirname,'../templates/partials')//for partials
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/weather',(req,res)=>{
 if(!req.query.address)
 {
     return res.send({
         error:'Please enter address'
     })
 }
 res.send({
     address:req.query.address
 })
})

app.get('/product',(req,res)=>{
    if(!req.query.search)//it kepp info in url 
    {
       return res.send({
         error:'You must provide a search  term'
        })
    } 
    res.send({
       products:[]
    })
})

app.get('',(req,res)=>{
    res.render('index',{
         title:'Weather app',
        name:'Tapendra '
    })
})  

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About PAge',
        name:"Tapendra",
        image:'tap'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'helpPage',
        name:'Tapendra'
    })
})

// from myside

app.get('/finalweather',(req,res)=>{
   const place=req.query.address
 

    geocode(place,(error,{latitude,longitude,location}={ })=>{
        if(error)
        {
            return res.send({
                error
            })
        }
         
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast:forecastData,
                address:place

            })
         
        })
    
    })


})




//


// //Send back html
// app.get('',(req,res)=>{ 
//     res.send('<h1>Weather</h1>')
// })
// //Send back Json
// app.get('/help',(req,res)=>{
//     res.send( [{
//         name:'Tapendra',
//         age:27
//     },{
//         name:'Kumar'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<htm><title>Hello</title></html')
// })
// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:{
//             name:'India',
//             location:{
//                 latitude:21,
//                 longitude:7 5
//             }
//         }
//     })
// })

app.get('/help/*',(req,res)=>{
   res.render('404',{
    title:'error',
    name:'Tapendra'
   })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'error',
        name:'Tapendra'
    })
})

// app.get('*',(req,res)=>{
//      res.send('MY 404 page')
// })
app.listen(3000,()=>{ 
    console.log('Server is up on port 3000')
}) 