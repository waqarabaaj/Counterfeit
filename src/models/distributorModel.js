import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({

    gln: { type: String, required: true },
    sscc: { type: String, required: true },
    giai: { type: String, required: true },
    quantity: { type: Number, required: true },
    distributorid: { type: mongoose.Schema.Types.ObjectId, required: true },

})

const Distributor = mongoose.models.distributorData || mongoose.model("distributorData", distributorSchema);

export default Distributor;