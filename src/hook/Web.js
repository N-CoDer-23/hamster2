export const useTelegram = () => {
    const increment = (count, setCount, numTouches) => {
        const newCount = count + numTouches;
        setCount(newCount);
        localStorage.setItem('count', newCount);
    };

    const decrement = (count, setCount) => {
        const newCount = count - 1;
        setCount(newCount);
        localStorage.setItem('count', newCount);
    };

    const onClose = () => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.close();
        }
    };

    const bot = window.Telegram ? window.Telegram.WebApp : null;

    return {
        increment,
        decrement,
        onClose,
        bot,
    };
};
