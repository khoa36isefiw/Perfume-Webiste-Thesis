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

export const calculateDiscount = (price) => {
    return price * 0.2; // 20% discount
};

export const calculateTax = (price) => {
    return price * 0.1; // 10% tax
};
