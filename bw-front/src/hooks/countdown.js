
const updateCountdown = (setHoursTens, setHoursOnes, setMinutesTens, setMinutesOnes) => {
    if (countdownDate) {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            setDays(String(Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0')));
            const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            setHoursTens(Math.floor(hoursLeft / 10).toString());
            setHoursOnes((hoursLeft % 10).toString());
            setMinutesTens(Math.floor(minutesLeft / 10).toString());
            setMinutesOnes((minutesLeft % 10).toString());
        } else {
            setDays('00');
            setHoursTens('0');
            setHoursOnes('0');
            setMinutesTens('0');
            setMinutesOnes('0');
        }
    }
};

const useCountdown = (setHoursTens, setHoursOnes, setMinutesTens, setMinutesOnes) => {
    const startCountdown = () => {
        updateCountdown(setHoursTens, setHoursOnes, setMinutesTens, setMinutesOnes);
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    };

    return { startCountdown }
}

export default useCountdown;