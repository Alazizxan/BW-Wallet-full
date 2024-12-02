import axios from "axios";

const TELEGRAM_BOT_TOKEN = "8159558283:AAEetjs_CfzllCfFDX_-BzSFpQE9l-DeLeo";

export default async function getFileLink(fileId) {
    const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
    return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${response.data.result.file_path}`;
}
