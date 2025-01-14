import { Request, Response } from 'express';
import { UserInput } from '../interfaces/user-input.interface';
import { generateText, generateQuestion } from '../services/quizz.services';

  export const getQuestion = async (req: Request, res: Response): Promise<any> => {
    try {
      const llmQuestion = await generateQuestion();
      if (llmQuestion) {
        res.status(200).send(llmQuestion);
      } else {
        res.status(400).send('Incorrect');
      }
    } catch (error) {
      console.error('Error :', error);
      res.status(500).send('Error');
    }
  };

  export const submitAnswer = async (req: Request, res: Response): Promise<any> => {
    const quizzInput: UserInput = req.body;
    if (!quizzInput || !quizzInput.answer) {
      return res.status(400).send('Invalid input received');
    }

    try {
      const llmResponse = await generateText(quizzInput);
        if (llmResponse) {
          res.status(200).send(llmResponse);
        } else {
          res.status(400).send('Incorrect');
        }
    } catch (error) {
      console.error('Error :', error);
      res.status(500).send('Error');
    }
  };