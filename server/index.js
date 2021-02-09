const cors = require('cors');
const express = require('express');
const specialisationRouter = require('./routes/specialisation.routes');
const masterRouter = require('./routes/master.routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', specialisationRouter);
app.use('/api', masterRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
