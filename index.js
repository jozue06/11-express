'use strict';


require('dotenv').config();

const PORT = process.env.PORT;

import 'babel-register';

require('./src/app.js').start( PORT, () => console.log(`Server up on ${PORT}`));


