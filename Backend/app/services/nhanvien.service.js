const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection('nhanvien');
    }

    async extractNhanvienData(payload) {
        const nhanvien = {
            _id: payload._id,
            maNV: payload.maNV,
            hotenNV: payload.hotenNV,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            dienthoaiNV: payload.dienthoaiNV,
            matkhauNV: payload.matkhauNV ? await bcrypt.hash(payload.matkhauNV, 10) : undefined,
        };
        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload) {       
        const nhanvien = await this.extractNhanvienData(payload);
        const result = await this.Nhanvien.findOneAndUpdate(
            { maNV: nhanvien.maNV },
            { $set: nhanvien },
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    async find(filter = {}) {
        const cursor = this.Nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            hotenNV: { $regex: new RegExp(name, 'i') }
        });
    }

    async findByTaiKhoan(dienthoaiNV) {
        return await this.Nhanvien.findOne({ dienthoaiNV });
    }

    async findById(id) {        
        try {
            const nhanvien = await this.Nhanvien.findOne({ _id: new ObjectId(id) });
            if (!nhanvien) {
                throw new Error(`Không tìm thấy tài liệu nhân viên với ID: ${id}`);
            }
            return nhanvien;
        } catch (error) {
            console.error('Lỗi khi tìm nhân viên:', error);
            throw error;
        }
    }

    async update(id, payload) {
        const filter = { _id: new ObjectId(id) };
        const update = await this.extractNhanvienData(payload);
        const result = await this.Nhanvien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Nhanvien.findOneAndDelete({ _id: new ObjectId(id) });
        return result;
    }

    async deleteAll() {
        const result = await this.Nhanvien.deleteMany({});
        return result.deletedCount;
    }

    async loginNhanVien(dienthoaiNV, matkhauNV) {
        if (!dienthoaiNV || !matkhauNV) {
            throw new Error("Số điện thoại và mật khẩu là bắt buộc");
        }

        const nhanVien = await this.Nhanvien.findOne({ dienthoaiNV });
        if (!nhanVien) {
            throw new Error("Số điện thoại hoặc mật khẩu không chính xác");
        }

        const isMatch = await bcrypt.compare(matkhauNV, nhanVien.matkhauNV);
        if (!isMatch) {
            throw new Error("Số điện thoại hoặc mật khẩu không chính xác");
        }

        return { role: "nhanvien", user: nhanVien };
    }

    async registerNhanVien(data) {
        if (!data.dienthoaiNV || !data.matkhauNV || !data.hotenNV) {
            throw new Error("Số điện thoại, mật khẩu, họ tên là bắt buộc");
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(data.dienthoaiNV)) {
            throw new Error("Số điện thoại không hợp lệ, phải gồm 10 số và bắt đầu bằng số 0");
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(data.matkhauNV)) {
            throw new Error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số");
        }

        if (data.matkhauNV !== data.confirmmatkhauNV) {
            throw new Error("Mật khẩu xác nhận không khớp");
        }

        try {
            const dienthoaiNV = data.dienthoaiNV;
            const existingNhanVien = await this.Nhanvien.findOne({ dienthoaiNV });
            if (existingNhanVien) {
                throw new Error('Số điện thoại đã được đăng ký');
            }

            const hashedPassword = bcrypt.hashSync(data.matkhauNV, 10);
            const count = await this.Nhanvien.countDocuments();
            const maNhanVien = `NV${String(count + 1).padStart(3, '0')}`;
            const newNhanVien = {
                _id: new ObjectId(),
                maNV: maNhanVien,
                hotenNV: data.hotenNV || 'Chưa cập nhật',
                chucvu: data.chucvu || 'Chưa cập nhật',
                diachi: data.diachi || 'Chưa cập nhật',
                dienthoaiNV: data.dienthoaiNV,
                matkhauNV: hashedPassword,
            };

            await this.Nhanvien.insertOne(newNhanVien);
            return { message: 'Đăng ký thành công', user: newNhanVien };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = NhanvienService;