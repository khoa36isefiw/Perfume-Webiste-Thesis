const Variant = require('../models/Variant.model');

const VariantService = {
    isInStock: async (id) => {
        const variant = await Variant.findOne({ _id: id });
        if (variant.stock < 1) {
            return false;
        }
        return true;
    },
};

module.exports = VariantService;
