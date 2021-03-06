const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Database connection established successfully");
})

const employeesRouter = require('./routes/employees');
const carmodelRouter = require('./routes/carmodels');
const salesRouter = require('./routes/sales');
const totalSalesRouter = require('./routes/total_sales');
const usersRouter = require('./routes/users');

app.use('/employees', employeesRouter);
app.use('/carmodels', carmodelRouter);
app.use('/sales', salesRouter);
app.use('/total_sales', totalSalesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
