const express = require('express');
const app = express();
const port = 3000;
const moment = require('moment')
require('moment-timezone')
const Agenda = require('agenda')
app.use(express.json());
const agenda = new Agenda({ db: { address: 'mongodb://localhost:27017/agenda' } });

agenda.define('hello', async (job) => {
    console.log('Hello, world!');
    job.attrs.shouldSaveResult = true;
})
app.post('/', async (req, res) => {
    let { toDate } = req.body

    let time;
    if (typeof toDate === 'string') {
        const parsedDate = Date.parse(toDate);
        if (isNaN(parsedDate)) {
            console.error('Invalid date format');
        } else {
            time = moment(parsedDate).tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
        }
    } else {
        time = moment(toDate).tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    }
    console.log(time);
    try {
        await agenda.start();
        await agenda.schedule(time, 'hello');
        res.json({ message: 'success', time })

    } catch (error) {
        console.log(error);
    }
}
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
