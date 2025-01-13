import express from 'express';
import { submitAnswer, getQuestion } from '../../controllers/submit-answer.controller';

const routerQuizz = express.Router();

routerQuizz.get('/question', getQuestion);
routerQuizz.post('/submit-answer', submitAnswer);

export default routerQuizz;