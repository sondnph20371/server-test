const mongoose = require('mongoose');
const SanPhamSchema = new mongoose.Schema({
    masp: { type: String, required: true },
    tensp: { type: String, required: true },
    anhsp: { type: String, required: true },
    loaisp: { type: String, required: true },
    giasp: { type: String, required: true }

}, {
    collection: 'thi'
}
);

const SanPhamModel = mongoose.model('thi', SanPhamSchema);
module.exports = SanPhamModel;

