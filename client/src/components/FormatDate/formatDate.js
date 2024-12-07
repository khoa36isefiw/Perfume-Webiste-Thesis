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


export function formatDateWithTime(isoDate) {
    const date = new Date(isoDate);

    // Lấy ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Lấy giờ, phút
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Kết hợp lại theo định dạng yêu cầu
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

const isoDate = "2024-12-06T03:39:10.703Z";
console.log(formatDate(isoDate)); // Output: "06/12/2024 - 3:39"
