import axios from 'axios';
import { IBotStats } from '../interfaces/index';

export const sendWebhook = (stats: IBotStats) => {
    const url = process.env.WEBHOOK_URL;
    if (!url) {
        return new Error('No webhook URL provided');
    }
    //discord embed
    const embed = {
        author: {
            name: 'Nors Bot Günlük İstatistik',
            icon_url: 'https://cdn.discordapp.com/avatars/681137419663441933/fffeb1863e2a2ba2ecdd85135c308b02.png',
        },
        timestamp: new Date(),
        color: stats.currentGuilds >= stats.previousGuilds ? 0x2ecc71 : 0xe74c3c,
        description: `Tarih: ${new Date().toLocaleString("tr").split(" ")[0]}`,
        fields: [
            {
                name: "Davet Et",
                value: `[Tıkla](${process.env.INVITE_URL})`,
                inline: true
            },
            {
                name: "Destek Sunucusu",
                value: `[Tıkla](${process.env.SUPPORT_SERVER_URL})`,
                inline: true
            },
            {
                name: "Oy Ver",
                value: `[Tıkla](${process.env.VOTE_URL})`,
                inline: true
            }
        ]
    }
    embed.description += `\nSunucu Sayısı: ${stats.currentGuilds} (${stats.currentGuilds - stats.previousGuilds > 0 ? '+' : ''}${stats.currentGuilds - stats.previousGuilds})`;
    embed.description += `\nOy Sayısı: ${stats.currentVotes} (${stats.currentVotes - stats.previousVotes > 0 ? '+' : ''}${stats.currentVotes - stats.previousVotes})`;
    embed.description += `\nBüyüme Oranı: %${((stats.currentGuilds - stats.previousGuilds) / (stats.previousGuilds || 1) * 100).toFixed(2)}`;

    axios.post(url, {
        embeds: [embed]
    }).then(() => {
        console.log('Webhook sent');
    }).catch((err) => {
        return err;
    });
};