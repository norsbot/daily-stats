import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import fs from 'fs';
export default class SpreadsheetAPI {
    private doc!: GoogleSpreadsheet;
    private sheet!: GoogleSpreadsheetWorksheet;
    async initialize() {
        console.log("Initializing", process.env.GOOGLE_SHEET_ID);
        this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
        const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
        await this.doc.useServiceAccountAuth({
            client_email: email,
            private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n') ?? '',
        });
        await this.doc.loadInfo();
        this.sheet = this.doc.sheetsByTitle['BotStats'] ?? await this.doc.addSheet({ title: 'BotStats', headerValues: ['date', 'guilds', 'votes'] });
        if (!this.sheet) {
            throw new Error("Sheet not found");
        }
    }

    async getLastRowData() {
        let rows = await this.sheet.getRows();
        return {
            previousGuilds: rows[rows.length - 1].guilds ?? 0,
            previousVotes: rows[rows.length - 1].votes ?? 0,
        }
    }

    async addRowData(data: any) {
        await this.sheet.addRow({
            date: new Date().toLocaleString("tr").split(" ")[0],
            guilds: data.currentGuilds,
            votes: data.currentVotes,
        });
    }
}