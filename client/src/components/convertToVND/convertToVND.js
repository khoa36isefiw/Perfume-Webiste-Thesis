export const converToVND = (price) => {
    return price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};
