import Questions from '../models/questionSchema.js';
import Results from '../models/resultSchema.js'
import questions, {answers} from '../database/data.js'

/**get all questions */

export async function  getQuestions(req,res){
    try{
        const q = await Questions.find()
        res.json(q)

    }catch(error){
        console.log({error});

    }

}
// export async function insertQuestions(req,res){
// try{
//     Questions.insertMany({questions , answers}, function(err,data){
//         res.json({msg:"Data saved Successfully"})
//     })

// }catch(error){
//     res.json({error})

// }

// }
// export function insertQuestions(req, res) {
//     Questions.insertMany({ questions: [0], answers: [1] })
//       .then(() => {
//         res.json({ msg: "Data saved successfully" });
//       })
//       .catch((error) => {
//         res.json({ error: error.message });
//       });
//   }
  
export async function insertQuestions(req, res) {
    try {
      await Questions.insertMany({ questions, answers });
      res.json({ msg: "Data saved successfully" });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  

/**Delete all questions */
export async function dropQuestions(req,res){
    try{
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});

    }catch(error){
        res.json({error})
    }
}

/**get all result */
export async function getResult(req,res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
   

}
/**post all result */
// export async function storeResult(req,res){
//     try{
//         const { username, result, attempts, points, achived } = req.body;
//         if(!username && !result) throw new Error('Data Not Provided...!');

//         Results.create({ username, result, attempts, points, achived }, function(err, data){
//             res.json({ msg : "Result Saved Successfully...!"})
//         })

//     }catch(error){
//         res.json({error})

//     }

// }
export async function storeResult(req, res) {
    try {
      const { username, result, attempts, points, achieved } = req.body;
      if (!username && !result) throw new Error('Data Not Provided...!');
  
      await Results.create({ username, result, attempts, points, achieved });
      res.json({ msg: "Result Saved Successfully...!" });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  
/**delete all request */
export async function dropResult(req,res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
   
}
