const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productContentSchema = new Schema(
    {
        originVn: String,
        originEn: String,
        yearOfRelease: String,
        concentration: String,
        fragranceGroup: String,
        manufacturer: String,
        shortContentVn: String,
        shortContentEn: String,
        topNotesVn: String,
        topNotesEn: String,
        heartNotesVn: String,
        heartNotesEn: String,
        baseNotesVn: String,
        baseNotesEn: String,
        mainContentVn: String,
        mainContentEn: String,
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
