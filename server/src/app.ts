import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { authRouter } from './routes/auth.routes';
import dotenv from 'dotenv';
import { limiter } from './utils/rateLimiter';
import User from './models/user.model';
import { helmetOptions } from './utils/helmetConfig';
import { corsOptions } from './utils/corsOptions';

dotenv.config();

const app: Application = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmetOptions);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', authRouter);

// Connect to the database
const sync = async () => {
  try {
    await User.sync({ alter: true });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the application if database connection fails
  }
};
sync();

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app
  .listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
  .on('error', (error) => {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the application if server startup fails
  });

export default app;
