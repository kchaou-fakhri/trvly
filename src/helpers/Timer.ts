export const Timer = (
    next: string,
    callback: (hours: number, minutes: number, seconds: number) => void
) => {
    const _next = new Date();
    const [hours, minutes] = next.split(":").map(Number);

    _next.setHours(hours);
    _next.setMinutes(minutes);
    _next.setSeconds(0);
    _next.setMilliseconds(0);

    if (_next < new Date()) {
        _next.setDate(_next.getDate() + 1);
    }

    // Calculate the initial difference and invoke the callback immediately
    const currentTime = new Date();
    const timeDifferenceMs = _next.getTime() - currentTime.getTime();

    if (timeDifferenceMs > 0) {
        const initialHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const initialMinutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
        const initialSeconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

        callback(initialHours, initialMinutes, initialSeconds);
    }

    const timer = setInterval(() => {
        const currentTime = new Date();
        const timeDifferenceMs = _next.getTime() - currentTime.getTime();

        if (timeDifferenceMs <= 0) {
            clearInterval(timer);
            callback(0, 0, 0);
            return;
        }

        const differenceHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const differenceMinutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
        const differenceSeconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

        callback(differenceHours, differenceMinutes, differenceSeconds);
    }, 1000);
};
