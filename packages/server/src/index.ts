import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();

app.use(cors({
  origin: 'https://insta-campus.vercel.app',  // <-- use this one exactly
  credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use('/api/v1', router);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
