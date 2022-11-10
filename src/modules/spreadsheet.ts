import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import fs from 'fs';
export default class SpreadsheetAPI {
    private doc: GoogleSpreadsheet | undefined;
    private sheet: GoogleSpreadsheetWorksheet | undefined;
    async initialize() {
        console.log("Initializing", process.env.GOOGLE_SHEET_ID);
        this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
        const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
        const key = fs.readFileSync("./privatekey.pem", "utf8");
        await this.doc.useServiceAccountAuth({
            client_email: email,
            private_key: key,
        });
        await this.doc.loadInfo();
        this.sheet = this.doc.sheetsByTitle['BotStats'] ?? await this.doc.addSheet({ title: 'BotStats', headerValues: ['date', 'guilds', 'votes'] });
    }

    async getLastRowData() {
        if (!this.sheet) {
            throw new Error('No sheet found');
        }
        let rows = await this.sheet.getRows();
        let prevStats
        if (rows.length > 0) {
            prevStats = {
                previousGuilds: rows[rows.length - 1].guilds,
                previousVotes: rows[rows.length - 1].votes,
            }
        } else {
            prevStats = {
                previousGuilds: 0,
                previousVotes: 0,
            }
        }
        return prevStats;
    }

    async addRowData(data: any) {
        if (!this.sheet) {
            throw new Error('No sheet found');
        }
        await this.sheet.addRow({
            date: new Date().toLocaleString("tr").split(" ")[0],
            guilds: data.currentGuilds,
            votes: data.currentVotes,
        });
    }
}