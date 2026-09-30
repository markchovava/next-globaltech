export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}

export function fullFormattedDate(date: Date): string {
    const daysOfWeek: string[] = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const months: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate(); // No leading zero needed for day of month
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero if less than 10
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format hours with a leading zero if needed (though the example "11.00am" suggests not for hours)
    // If you want "09.00am" for 9 AM, uncomment the next line:
    // hours = String(hours).padStart(2, '0');

    return `${dayOfWeek} ${dayOfMonth} ${month} ${year} ${hours}.${minutes}${ampm}`;
}


export const getPastNumberedYears = (num: number): number[] => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: num }, (_, index) => currentYear - index);
};



interface ParsedDate {
    day: number;
    monthName: string;
    year: number;
}

export const parseDateInfo = (dateString: string): ParsedDate => {
    const [yearStr, , dayStr] = dateString.split('-');
    const dateObj = new Date(`${dateString}T00:00:00`);

    return {
        day: parseInt(dayStr, 10),
        monthName: dateObj.toLocaleDateString('en-US', { month: 'long' }),
        year: parseInt(yearStr, 10),
    };
};