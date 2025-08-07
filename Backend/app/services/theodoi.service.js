const { ObjectId } = require('mongodb');
const Sach = require('../services/sach.service.js');

class TheodoiService {
    constructor(client) {
        this.Theodoi = client.db().collection('theodoi');
        this.Docgia = client.db().collection('docgia');
        this.Sach = client.db().collection('sach');
    }

    async extractTheodoiData(payload) {
        const theodoi = {
            _id: payload._id,
            maDG: payload.maDG,
            maSach: payload.maSach,
            ngayMuon: payload.ngayMuon,
            ngayTra: payload.ngayTra,
            trangThai: payload.trangThai,
            soQuyen: payload.soQuyen,
        };
        Object.keys(theodoi).forEach(
            (key) => theodoi[key] === undefined && delete theodoi[key]
        );
        return theodoi;
    }

    async create(payload) {
        const docGia = await this.Docgia.findOne({ maDG: payload.maDG });
        if (!docGia) {
            throw new Error(`Không tìm thấy độc giả với mã ${payload.maDG}`);
        }

        const sach = await this.Sach.findOne({ maSach: payload.maSach });
        if (!sach) {
            throw new Error(`Không tìm thấy sách với mã ${payload.maSach}`);
        }

        if (sach.soQuyen < payload.soQuyen) {
            throw new Error(`Số lượng sách không đủ. Hiện tại chỉ còn ${sach.soQuyen} quyển.`);
        }

        await this.Sach.updateOne(
            { maSach: payload.maSach },
            { $inc: { soQuyen: -payload.soQuyen } }
        );

        const theodoi = await this.extractTheodoiData(payload);
        const result = await this.Theodoi.insertOne(theodoi);

        return await this.Theodoi.findOne({ _id: result.insertedId });
    }

    async find(filter) {
        return await this.Theodoi.find(filter).toArray();
    }

    async findById(id) {
        return await this.Theodoi.findOne({ _id: new ObjectId(id) });
    }

    async update(id, payload) {
        const update = this.extractTheodoiData(payload);
        const result = await this.Theodoi.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnDocument: 'after' }
        );
        return result?.value ? true : false;
    }

    async delete(id) {
        const result = await this.Theodoi.findOneAndDelete({ _id: new ObjectId(id) });
        return result;
    }

    async deleteAll() {
        const result = await this.Theodoi.deleteMany({});
        return result.deletedCount;
    }

    async dangKyMuonSach(docGiaID, maSach, soQuyen, ngayMuon) {
        if (!docGiaID || !maSach || !soQuyen || !ngayMuon) {
            throw new Error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
        }

        const _id = new ObjectId(docGiaID);
        const docGia = await this.Docgia.findOne({ _id });
        if (!docGia) {
            throw new Error(`Không tìm thấy độc giả với mã: ${_id}`);
        }

        const sach = await this.Sach.findOne({ maSach });
        if (!sach) {
            throw new Error(`Không tìm thấy sách với mã: ${maSach}`);
        }

        if (sach.soQuyen < soQuyen) {
            throw new Error(`Sách ${sach.tenSach} chỉ còn ${sach.soQuyen} quyển, không đủ số lượng yêu cầu`);
        }

        const theodoi = await this.extractTheodoiData({
            maDG: docGiaID,
            maSach,
            soQuyen,
            ngayMuon,
            trangThai: 'Chờ duyệt'
        });

        await this.Theodoi.insertOne(theodoi);
        return { message: 'Đăng ký mượn sách thành công, vui lòng chờ duyệt', theodoi };
    }

    async duyetMuonSach(id) {
        const muonSach = await this.findById(id);
        if (!muonSach) {
            throw new Error('Không tìm thấy yêu cầu mượn sách');
        }
        if (muonSach.trangThai !== 'Chờ duyệt') {
            throw new Error('Yêu cầu này không thể duyệt');
        }

        const sach = await this.Sach.findOne({ maSach: muonSach.maSach });
        if (!sach || sach.soQuyen < muonSach.soQuyen) {
            throw new Error(`Sách không đủ số lượng để duyệt`);
        }

        await this.Sach.updateOne(
            { maSach: muonSach.maSach },
            { $inc: { soQuyen: -muonSach.soQuyen } }
        );

        await this.Theodoi.updateOne(
            { _id: new ObjectId(id) },
            { $set: { trangThai: 'Đang mượn' } }
        );

        return { message: 'Đã duyệt yêu cầu mượn sách', muonSach };
    }

    async xacNhanTraSach(id) {
        const muonSach = await this.findById(id);
        if (!muonSach) throw new Error('Không tìm thấy yêu cầu mượn sách');
        
        if (muonSach.trangThai !== 'Đang mượn') throw new Error('Chỉ có thể xác nhận trả sách khi đang trong trạng thái Đang mượn');
        
        await this.Sach.updateOne(
            { maSach: muonSach.maSach },
            { $inc: { soQuyen: muonSach.soQuyen } }
        );

        await this.Theodoi.updateOne(
            { _id: new ObjectId(id) },
            { $set: { trangThai: 'Đã trả', ngayTra: new Date() } }
        );

        return { message: 'Xác nhận trả sách thành công', muonSach };
    }
}

module.exports = TheodoiService;
