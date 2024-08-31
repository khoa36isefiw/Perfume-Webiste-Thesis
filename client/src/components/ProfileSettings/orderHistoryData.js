// date: YYYY-MM-DD

export const orderHistoryData = [
    {
        orderNumber: '001',
        orderDate: '2024-04-18',
        deliveryDate: '2024-04-21',
        orderAddress: 'Số 1 Võ Văn Ngân',
        orderData: [
            // list of orders data for this order number
            {
                orderID: 1,
                orderImage: 'https://orchard.vn/wp-content/uploads/2018/04/dior-sauvage-edp_1.jpg',
                orderName: 'Dior Sauvage EDP',
                orderBrand: 'Dior',
                orderSize: '125',
                orderPrice: '80.00',
            },
            {
                orderID: 2,
                orderImage:
                    'https://orchard.vn/wp-content/uploads/2019/11/yves-saint-laurent-la-nuit-de-lhomme-edt_1.jpg',
                orderName: "Yves Saint Laurent La Nuit De L'Homme EDT",
                orderBrand: 'Yves Saint Laurent',
                orderSize: '60',
                orderPrice: '105.00',
            },
        ],
        orderTotal: '185.00',
    },
    {
        orderNumber: '002',
        orderDate: '2024-05-21',
        deliveryDate: '2024-05-23',
        // orderAddress: 'HCMUSSH Đinh Tiên Hoàng, Quận 1',
        orderAddress: 'Đường Ba Tháng Hai, TT. Hậu Nghĩa, Đức Hòa, Long An.',
        orderData: [
            // list of orders data for this order number
            {
                orderID: 1,
                orderImage: 'https://orchard.vn/wp-content/uploads/2017/09/gucci-bloom-edp_1.jpg',
                orderName: 'Gucci Bloom',
                orderBrand: 'Gucci',
                orderSize: '30',
                orderPrice: '68.00',
            },
            {
                orderID: 2,
                orderImage:
                    'https://orchard.vn/wp-content/uploads/2019/07/dolce-gabbana-light-blue-eau-intense-for-women_1.jpg',
                orderName: 'Dolce & Gabbana Light Blue Eau Intense EDP',
                orderBrand: 'Dolce & Gabbana',
                orderSize: '100',
                orderPrice: '92.00',
            },
        ],
        orderTotal: '160.00',
    },
];
