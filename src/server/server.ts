import dotenv from 'dotenv';
import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express';
import type { MongooseError } from 'mongoose';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import users from './routes/users.routes';
import anime from './routes/anime.routes';

dotenv.config();
const app = express();
const PORT = 80;
const mongoURI = process.env.MONGO_URI!;

mongoose
  .connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((err: MongooseError) => {
    console.log('Error connecting to MongoDB: ', err);
  });

// Routers to parse incoming requests
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Test router
app.use('/api/users', users);

// Test anilist api
app.use('/api/anime', anime, (req: Request, res: Response) => {
  res.status(200).json(res.locals.data);
});

// Catch all request handler
app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

// Global error handler
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const defaultError = {
      log: 'Express error handle caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log('error: ', errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
