const { ObjectId } = require('mongodb');

class SachService {
    constructor(client) {
        this.client = client;
        this.Sach = client.db().collection('sach');
        this.NXB = client.db().collection('nxb');
    }

    async extractSachData(payload) {
        const count = await this.Sach.countDocuments();
        const maS = payload.maSach || `Sach${String(count + 1).padStart(3, '0')}`;
        const sach = {
            _id: payload._id,
            maSach: maS,
            tenSach: payload.tenSach,
            donGia: payload.donGia,
            soQuyen: payload.soQuyen,
            namXB: payload.namXB,
            maNXB: payload.maNXB,
            tacGia: payload.tacGia,
                hinhAnh: payload.hinhAnh, // thêm ở đây

        };
        Object.keys(sach).forEach((key) => {
            if (sach[key] === undefined) delete sach[key];
        });
        return sach;
    }

    async create(payload) {
        const nxb = await this.NXB.findOne({ maNXB: payload.maNXB });
        if (!nxb) {
            throw new Error("Nhà xuất bản không tồn tại");
        }
        const sach = await this.extractSachData(payload);
        const result = await this.Sach.findOneAndUpdate(
            { maSach: sach.maSach },
            { $set: sach },
            { returnDocument: 'after', upsert: true }
        );
        return result;
    }

    async find(filter = {}) {
        const cursor = this.Sach.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenSach: { $regex: new RegExp(name, 'i') }
        });
    }

    async findById(id) {
        try {
            const sach = await this.Sach.findOne({ _id: new ObjectId(id) });
            if (!sach) {
                throw new Error(`Không tìm thấy sách với ID: ${id}`);
            }
            return sach;
        } catch (error) {
            console.error('Lỗi khi tìm sách:', error);
            throw error;
        }
    }

    async update(id, payload) {
        if (payload._id) {
            delete payload._id;
        }

        const update = await this.extractSachData(payload);

        try {
            const result = await this.Sach.findOneAndUpdate(
            { _id: new ObjectId(id) }, 
            { $set: update }, 
            { returnDocument: 'after' }
            );

            if (!result) {
            throw new Error(`Không tìm thấy sách với ID=${id}`);
            }
            return result;
        } catch (error) {
            console.error("Chi tiết lỗi:", error);
            throw new Error(`Lỗi khi cập nhật sách với ID=${id}`);
        }
    }


    async delete(id) {
        const result = await this.Sach.findOneAndDelete({ _id: new ObjectId(id) });
        return result;
    }

    async deleteAll() {
        const result = await this.Sach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = SachService;