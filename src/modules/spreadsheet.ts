import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
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
        this.sheet = this.doc.sheetsByTitle['BotStats'] ?? await this.doc.addSheet({ title: 'BotStats', headerValues: ['Date', 'Guilds', 'Votes', "New Guilds", "New Votes", "Growth Rate"] });
        if (!this.sheet) {
            throw new Error("Sheet not found");
        }
    }

    async getLastRowData() {
        let rows = await this.sheet.getRows();
        return {
            previousGuilds: rows[rows.length - 1]?.Guilds ?? 0,
            previousVotes: rows[rows.length - 1]?.Votes ?? 0,
        }
    }

    async addRowData(data: any) {
        await this.sheet.addRow({
            Date: new Date().toLocaleString("tr").split(" ")[0],
            Guilds: data.currentGuilds,
            Votes: data.currentVotes,
            "New Guilds": data.currentGuilds - data.previousGuilds,
            "New Votes": data.currentVotes - data.previousVotes,
            "Growth Rate": ((data.currentGuilds - data.previousGuilds) / (data.previousGuilds || 1) * 100).toFixed(2),
        });
    }
}