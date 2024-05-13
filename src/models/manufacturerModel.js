import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema({

    gln: { type: String, required: true },
    gtin: { type: String, required: true },
    sscc: { type: String, required: true },
    grai: { type: String, required: true },
    giai: { type: String, required: true },
    quantity: { type: Number, required: true },
    manufacturerid: { type: mongoose.Schema.Types.ObjectId, required: true },

})

const Manufacturer = mongoose.models.manufacturerData || mongoose.model("manufacturerData", manufacturerSchema);

export default Manufacturer;