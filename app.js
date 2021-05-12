const express = require('express');
const PORT = process.env.PORT || 3000; 
const app = express();


const userRouter = require('./routes/usersRouter');
const eventsRouter = require('./routes/eventsRouter');
app.use(express.urlencoded({extended: true}));
app.use(express.json())                        

app.use('/users', userRouter);
app.use('/events', eventsRouter);


app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});