const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productContentSchema = new Schema(
    {
        origin: String,
        yearOfRelease: String,
        concentration: String,
        fragranceGroup: String,
        manufacturer: String,
        shortContent: String,
        topNotes: String,
        heartNotes: String,
        baseNotes: String,
        mainContent: String,
        longevity: Number,
        sillage: Number,
        likability: Number,
    },
    {
        _id: false,
    },
);

const productSchema = new Schema(
    {
        nameVn: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        shortDescriptionVn: String,
        shortDescriptionEn: String,
        imagePath: [
            'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png',
            'https://orchard.vn/wp-content/uploads/2015/04/dior-homme-intense_2.jpg',
            'https://orchard.vn/wp-content/uploads/2015/04/dior-homme-intense_3.jpg',
            'https://orchard.vn/wp-content/uploads/2015/04/dior-homme-intense_4.jpg',
        ],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            default: null,
        },
        variants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Variant',
            },
        ],
        content: {
            type: productContentSchema,
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', productSchema);
