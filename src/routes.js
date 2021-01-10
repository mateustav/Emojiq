const express = require('express');
const router = express.Router();

app.get('/', (req, res) => res.send('This is Emojiq!'));

router.use('/oauth');