import * as dotenv from 'dotenv';
import { getBotStats } from './modules/topgg';
import SpreadsheetAPI from './modules/spreadsheet';
import { sendWebhook } from './modules/webhook';
import { IBotStats } from './interfaces/index';
dotenv.config();

async function run() {
    try {
        console.log("Running");
        const spreadsheet = new SpreadsheetAPI();
        await spreadsheet.initialize();
        const prevStats = await spreadsheet.getLastRowData();
        const botStats = await getBotStats();
        const stats: IBotStats = {
            currentGuilds: botStats.currentGuilds,
            currentVotes: botStats.currentVotes,
            previousGuilds: prevStats.previousGuilds,
            previousVotes: prevStats.previousVotes,
        }
        await spreadsheet.addRowData(stats);
        sendWebhook(stats);
    } catch (error) {
        console.log(error);
    }
}

run();