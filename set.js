const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BYZkhDb1ZmZWN3bDRlNDZQd2pMVGIwRUNPbXZ1R1Z4UVVwVDJoYVducz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUJvWGlhLzNrUHowS1dsSVNiMCtNQkFrdGJWeGhiUVlUSEpjZ0dYSEd3bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRlg5RllFcVh2SjIvTkdWeDlodTJkbjdBdFkwcG10KzlYL09aeVUrMEg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLNFVPMmdabnpRczBKOU9mZ3FFampIaXlneitBSzdLdW84ZkJFdWpGMnhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1MWGdlVHI3V0YraFNzcFRpZDJvMXJhQTdEYVUwem9VdEl1S2lKWGtrRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldRRkRPNjlVNDFPY1IzWFBwTHNxRkxkS3ZMZDdTTzB3eGIxRkF3QkZWeXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkN5N09IcXhRYklrak1ndzhZdUNGRW1uSnZ4Qm1EZC9XV3F3cEwwZ3hsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2hHc29kcEhUNmZncDFmVnZLSnAwOGF4Ym1IdVhIM0kvSkpUUmV3VC9YQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMN1JxZzdTczN3MlFTMEtkd1NtOUNkc2FJYXVLOXk5RVJSVWZQZEtGY0hJWUkvL0Y4MTFqUWpPeUozN3pUWExZMXZMUlQ4SHZqVW9sYVBTSDFIeGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJxZllGYTJtN0FxekxCSHJiR3dZU05vRnVPSDVudXJSbndNMlliYkZNdUJFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQZExmc3N6N1NSR3Q3MnBrd2tRQll3IiwicGhvbmVJZCI6IjVkZTEyYWVjLWZiMTItNGQxYy1iNGVjLWEwM2FiOWZjY2RmZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJraWlwQ3ExQ0lIeTNTNTlDNVlIMXVvR1N0R1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFZhanZJZStpZWIwdStzVFNBOUtTNzJFaGt3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQxVko4WTJGIiwibWUiOnsiaWQiOiIyMzQ4MTE4NDU5MjcxOjM5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKQ3E4NThIRVBLNGxMc0dHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqa09lN3pndC9Zd2pUZHNyWjg2TllKOGFENWZLT1NsbDNBTmJEekpXa2hzPSIsImFjY291bnRTaWduYXR1cmUiOiJaM1MrdHYyWUl5a3pjYy9Ga3Z6UVQ1Q2dwbmgvcTRzQnFQOTRINThDamYrUTV2QkFrczMzSnk0cXVkc1A3UGltMm5pVU9tTUlWbWFGaHZ1L2ZrZllBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaDkyYVRCNlQ4Tzkrd3NMSExHRHRRbGsxaUtCNHhyeXBlNlQ3LzFFL1lXQkxGUisyNlV4Rko0bmxmOEF2aXRHWFJGNEJZazdGT1FhOExqOVl0SldFaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTE4NDU5MjcxOjM5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlk1RG51ODRMZjJNSTAzYksyZk9qV0NmR2crWHlqa3BaZHdEV3c4eVZwSWIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQ2Nzk2ODAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRHJTIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "God's Son",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348118459271",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nigeria',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
