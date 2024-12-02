function timestampToDHMS(dateString) {
    const startDate = new Date(dateString);
    const now = new Date();

    const diffMs = Math.abs(now - startDate);

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return { days, hours, minutes };
}

function DHMSToTimestamp(days, hours, minutes) {
    const now = new Date();

    now.setDate(now.getDate() + days);
    now.setHours(now.getHours() + hours);
    now.setMinutes(now.getMinutes() + minutes);



    return now.toISOString().replace('T', ' ').substring(0, 23);
}

export {
    DHMSToTimestamp,
    timestampToDHMS,
}