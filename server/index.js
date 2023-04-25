const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();


// middlewares
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/notes',notesRoutes);



const port = process.env.PORT || 3100

app.listen(port , ()=>console.log(`started at port : ${port}`))