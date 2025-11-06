import express from 'express';
import { PORT } from './config/env.js';
import cors from 'cors';
import { connectToDatabase } from './database/mongodb.js';
import adminRouter from './routes/admin.routes.js';
import surveyRouter from './routes/survey.routes.js';
import userRouter from './routes/user.routes.js';
import reportRouter from './routes/report.routes.js';
const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/dropdown',surveyRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/report" , reportRouter);


app.get('/', (req, res) => {
  res.send("welcome....");
});

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, async () => {
  console.log(`Happy village running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
