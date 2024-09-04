"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const getAllCategories = async (req, res) => {
    try {
        const categories = [
            { name: 'מוצרי נקיון', productsSum: 0 },
            { name: 'גבינות', productsSum: 0 },
            { name: 'ירקות ופירות', productsSum: 0 },
            { name: 'בשר ודגים', productsSum: 0 },
            { name: 'מאפים', productsSum: 0 }
        ];
        res.status(200).send(categories);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
};
exports.getAllCategories = getAllCategories;
