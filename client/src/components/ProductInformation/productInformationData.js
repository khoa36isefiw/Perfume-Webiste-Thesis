import payment from '../../assets/images/payment.png';
import delivery from '../../assets/images/delivery.png';
import exchange from '../../assets/images/exchange.png';
import shield from '../../assets/images/shield.png';
export const productInformationData = [
    {
        brand: 'Maison Francis Kurkdjian Paris', // thương hiệu
        origin: 'Pháp', // xuất xứ
        yearOfRelease: '2017', // năm sản xuất
        concentration: 'Extrait de Parfum (EDP)', // nồng độ
        fragranceGroup: 'Oriental Floral (Hương Thơm Hoa Cỏ Phương Đông)', // nhóm hương
        manufacturer: 'Francis Kurkdjian', // nhà chế tác
        content: {
            description: `Baccarat Rouge 540 Extrait De Parfum by Maison Francis Kurkdjian là một hương thơm thuộc nhóm hương Oriental Floral, được ra mắt vào năm 2017. Đây là phiên bản nồng độ cao hơn và phong phú hơn của Baccarat Rouge 540, do chính Francis Kurkdjian sáng tạo.`,
            notes: {
                topNotes: ['Nghệ tây', 'Hạnh nhân đắng'],
                heartNotes: ['Hoa nhài Ai Cập', 'Gỗ tuyết tùng'],
                baseNotes: ['Hương gỗ', 'Hổ phách', 'Xạ hương'],
            },
            scentProfile: `Baccarat Rouge 540 Extrait De Parfum mở đầu với sự quyến rũ của nghệ tây và hạnh nhân đắng, tạo nên một sự khởi đầu ấm áp và phong phú. Hương giữa là sự kết hợp tinh tế giữa hoa nhài Ai Cập và gỗ tuyết tùng, mang lại sự thanh thoát và sang trọng. Cuối cùng, hương gỗ, hổ phách và xạ hương tạo nên tầng hương cuối ấm áp, sâu lắng và bền bỉ.`,
            impression: `Baccarat Rouge 540 Extrait De Parfum mang lại cảm giác sang trọng, quý phái và độc đáo. Hương thơm này rất phù hợp khi sử dụng trong những dịp đặc biệt, tiệc tối hoặc sự kiện đẳng cấp. Nó toát lên sự tự tin và cuốn hút, khiến người sử dụng trở thành tâm điểm chú ý.`,
            targetAudience: `Thuộc nhóm hương Oriental Floral, Baccarat Rouge 540 Extrait De Parfum phù hợp với những người có gu thẩm mỹ tinh tế, yêu thích sự độc đáo và khác biệt. Họ thường là những người có phong cách riêng biệt, không ngại nổi bật và luôn tìm kiếm sự hoàn hảo. Mùi hương này giúp họ thể hiện sự tự tin và đẳng cấp của mình một cách rõ nét.`,
            usage: `Sử dụng Baccarat Rouge 540 Extrait De Parfum sẽ giúp bạn xây dựng hình ảnh của một người quý phái, tự tin và đầy sức hút. Đây là mùi hương dành cho những ai muốn để lại ấn tượng mạnh mẽ và khó quên trong mắt người khác.`,
            ratings: {
                longevity: 5,
                sillage: 5,
                likability: 4,
            },
            occasion: `Thích hợp cho những dịp đặc biệt, tiệc tối, sự kiện đẳng cấp và những buổi gặp gỡ quan trọng.`,
        },
    },
];

export const policyData = [
    { image: shield, policyText: 'Cam kết chính hãng 100%' },
    { image: exchange, policyText: 'Bảo hành đến giọt cuối cùng' },
    { image: delivery, policyText: 'Giao hàng miễn phí toàn quốc' },
    { image: payment, policyText: 'Thanh toán online an toàn' },
];
