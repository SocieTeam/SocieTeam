const express = require('express');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000; 
const app = express();


const userRouter = require('./routes/userRouter');

app.use(express.urlencoded({extended: true}));
app.use(express.json())                        
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use('/', userRouter);


app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});