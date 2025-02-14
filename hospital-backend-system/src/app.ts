import express from 'express';
import mongoose from 'mongoose';
import logger from "morgan";
import appRouter from './routes';
// import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
// setupSwagger(app);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hospital-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', appRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});