const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = { origin: process.env.ALLOWED_ORIGIN }

const userRouter = require('./routes/usersRouter');
const eventsRouter = require('./routes/eventsRouter');

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', userRouter);
app.use('/events', eventsRouter);

app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});