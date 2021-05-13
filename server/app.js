const express = require('express');
// const methodOverride = require('method-override');
const PORT = process.env.PORT || 5000; 
const app = express();


const userRouter = require('./routes/usersRouter');
const eventsRouter = require('./routes/eventsRouter');

app.use(express.urlencoded({extended: true}));
app.use(express.json())                        
// app.use(methodOverride('_method'));

app.use('/users', userRouter);
app.use('/events', eventsRouter);


app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});