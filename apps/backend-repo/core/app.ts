import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
