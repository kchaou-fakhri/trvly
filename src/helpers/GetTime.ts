export const getFormattedTime = (timeString: String) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    // Creating a new Date object with the current date and specific time
    const date = new Date();
    return date.setHours(hours, minutes, 0, 0);
}


export const getCurrentDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return date.setHours(hours, minutes, 0, 0);
}

export const getCurrentDateAsDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    date.setHours(hours, minutes, 0, 0);
    return date;
};

