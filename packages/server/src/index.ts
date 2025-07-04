import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';




const app = express();
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
