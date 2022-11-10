import { Api } from '@top-gg/sdk';

export const getBotStats = async (): Promise<{ currentGuilds: number; currentVotes: number; } | any> => {
    try {
        const api = new Api(process.env.TOPGG_TOKEN ?? '');
        var bot = await api.getBot(process.env.BOT_ID ?? '');
        let botstring = JSON.parse(JSON.stringify(bot));
        const stats = {
            currentGuilds: botstring.server_count,
            currentVotes: botstring.monthlyPoints
        }
        return stats;
    } catch (error) {
        return error;
    }
};