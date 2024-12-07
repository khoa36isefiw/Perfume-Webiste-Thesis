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
            {
                type: String,
            },
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
        unitsSold: {
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
