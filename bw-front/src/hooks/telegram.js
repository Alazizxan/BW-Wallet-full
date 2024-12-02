

const useTelegram = () => {
    const telegram = window.Telegram.WebApp;
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    const referall = window.Telegram.WebApp.initDataUnsafe?.start_param ?? null;

    return {
        telegram,
        user,
        referall
    }
}

export default useTelegram;