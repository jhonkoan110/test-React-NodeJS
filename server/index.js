import cors from 'cors';
import express from 'express';
import masterRouter from './controllers/master.controller';
import specialisationRouter from './controllers/specialisation.controller';

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cors());

// http://localhost:3005/api/specialisation
app.use('/api/specialisation', specialisationRouter);

// http://localhost:3005/api/master
app.use('/api/master', masterRouter);

// http://localhost:3005
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
