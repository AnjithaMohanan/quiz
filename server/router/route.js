import { Router } from 'express';
const router = Router();

/**import controllers */
import * as controller from '../controllers/controller.js';

/**questions routes api */

router
  .route('/questions')
  .get(controller.getQuestions) /**get request */
  .post(controller.insertQuestions) /**post request */
  .delete(controller.dropQuestions); /** delete request */

router
  .route('/result')
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.dropResult);

export default router;
