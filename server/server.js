import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';

/**import connection file */
import connect from './database/conn.js';

const app =express()


/**app middilewares */
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
config();
/**Application port */
const port = process.env.PORT || 3000;


/**routes */
app.use('/api',router) /**apis */

app.get('/',(req,res)=>{
    try{
        res.json("Get Request")

    }catch(error){
        res.json(error)
    }
})
connect().then(()=>{
   try{
    app.listen(port,()=>{
        console.log(`server connected to http://localhost:${port}`);
    })
    
   }catch(error){
    console.log("Cannot connect to the server");
   }

}).catch(error =>{
    console.log("Invalid database connection");
})


