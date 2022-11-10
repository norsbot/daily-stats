import * as dotenv from 'dotenv'
import { createServer } from 'http';
import { getBotStats } from './modules/topgg';
import SpreadsheetAPI from './modules/spreadsheet';
import { sendWebhook } from './modules/webhook';
import { IBotStats } from './interfaces/index';
dotenv.config()

createServer(function (req: any, res: any) {
    console.log(req.url);
    if (req.url === '/hc') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello World' }));
    } else if (req.url == "/run") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Running' }));
        run();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end();
    }
}).listen(3000, function () {
    console.log("server start at port 3000");
});

async function run() {
    try {
        console.log("Running");
        let spreadsheet = new SpreadsheetAPI();
        await spreadsheet.initialize();
        let prevStats = await spreadsheet.getLastRowData();
        let botStats = await getBotStats();
        await spreadsheet.addRowData(botStats);
        let stats: IBotStats = {
            currentGuilds: botStats.currentGuilds,
            currentVotes: botStats.currentVotes,
            previousGuilds: prevStats.previousGuilds,
            previousVotes: prevStats.previousVotes,
        }
        sendWebhook(stats);
    } catch (error) {
        console.log(error);
    }
}

// (async () => {
//     let spreadsheet = new SpreadsheetAPI();
//     await spreadsheet.initialize();
//     console.log(await getBotStats());
// })();