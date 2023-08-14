import express from 'express';
import bodyParser from 'body-parser';
import router from './endpoints/router.js';

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
}
);