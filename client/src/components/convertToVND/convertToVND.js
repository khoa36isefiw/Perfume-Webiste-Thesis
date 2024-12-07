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

export const calculateDiscount = (price, discount = null) => {
    return discount === null ? 0 : price * (discount / 100);
};

export const calculateTax = (price) => {
    return price * 0.1; // 10% tax
};
