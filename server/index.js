import cors from 'cors';
import express from 'express';
import masterRouter from './controller/master.controller';
import specialisationRouter from './controller/specialisation.controller';

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/specialisation', specialisationRouter);
app.use('/api/master', masterRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
