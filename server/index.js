import express from 'express';
import path from 'path';

const app = express();
const DIST_DIR = path.join(__dirname, '../dist');

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
	res.sendFile(path.join(DIST_DIR, 'index.html'));
});
app.listen(process.env.PORT || 4000);
