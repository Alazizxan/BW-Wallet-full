module.exports = function formatTimestamp() {
    const date = new Date();    

    console.log();
    

    return {
        formattedDate: date.toLocaleDateString(), // e.g., 11/9/2024
        formattedTime: `${date.getHours()}:${date.getMinutes()}`   // e.g., 12:29:06 PM
    };

}