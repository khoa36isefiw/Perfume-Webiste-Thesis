export const converToVND = (price) => {
    return price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};

export const converToUSD = (price) => {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};
