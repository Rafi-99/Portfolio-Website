import { Router } from 'express';
import path from 'path';

let router = Router();
const __dirname = path.resolve();

router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '/pages/about.html'));
});

export default router;