const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use routes with /api prefix
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Node.js backend running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

