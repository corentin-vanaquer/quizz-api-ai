import express from 'express';
import routerQuizz from './api/submit-answer.routing';

const router = express.Router();

router.use('/api', routerQuizz);

export default router;