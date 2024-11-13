export const formatDate = (inputDate) => {
    // Convert input to a Date object if it's not already
    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
    const year = date.getFullYear();

    return `${month}/${day}/${year}`; // Return in mm/dd/yyyy format
};

export const formatDateDD = (inputDate) => {
    // Convert input to a Date object if it's not already
    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Return in DD/MM/yyyy format
};

export const formatDDMM = (inputDate) => {
    // Convert input to a Date object if it's not already
    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
    const year = date.getFullYear();

    return `${year}/${month}/${day}`; // Return in dd/mm/yyyy format
};
