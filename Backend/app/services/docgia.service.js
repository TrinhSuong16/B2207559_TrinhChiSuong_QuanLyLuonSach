const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class DocgiaService {
    constructor(client) {
        this.Docgia = client.db().collection('docgia');
    }

    async extractDocgiaData(payload) {
        const docgia = {
            _id: payload._id,
            maDG: payload.maDG,
            tenDG: payload.tenDG,
            ngaysinh: payload.ngaysinh,
            gioitinh: payload.gioitinh,
            diachi: payload.diachi,
            dienthoaiDG: payload.dienthoaiDG,
            matkhauDG: payload.matkhauDG ? await bcrypt.hash(payload.matkhauDG, 10) : undefined,
        };
        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );
        return docgia;
    }

    async create(payload) {
        const docgia = await this.extractDocgiaData(payload);
        const result = await this.Docgia.findOneAndUpdate(
            { maDG: docgia.maDG },
            { $set: docgia },
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    async find(filter = {}) {
        const cursor = this.Docgia.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenDG: { $regex: new RegExp(name, 'i') }
        });
    }

    async findByTaiKhoan(dienthoaiDG) {
        return await this.Docgia.findOne({ dienthoaiDG });
    }

    async findById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID không hợp lệ');
            }
            const docgia = await this.Docgia.findOne({ _id: new ObjectId(id) });
            if (!docgia) {
                throw new Error(`Không tìm thấy tài liệu độc giả với ID: ${id}`);
            }
            return docgia;
        } catch (error) {
            console.error('Lỗi khi tìm độc giả:', error);
            throw error;
        }
    }

    async update(id, payload) {
        const filter = { _id: new ObjectId(id) };
        const update = await this.extractDocgiaData(payload);
        const result = await this.Docgia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }


    async delete(id) {
        const result = await this.Docgia.findOneAndDelete({ _id: new ObjectId(id) });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Docgia.deleteMany({});
        return result.deletedCount;
    }

    async loginDocGia(dienthoaiDG, matkhauDG) {
        if (!dienthoaiDG || !matkhauDG) {
            throw new Error("Số điện thoại và mật khẩu là bắt buộc");
        }

        const docGia = await this.Docgia.findOne({ dienthoaiDG });
        if (!docGia) {
            throw new Error("Số điện thoại hoặc mật khẩu không chính xác");
        }

        const isMatch = await bcrypt.compare(matkhauDG, docGia.matkhauDG);
        if (!isMatch) {
            throw new Error("Số điện thoại hoặc mật khẩu không chính xác");
        }

        return { role: "docgia", user: docGia };
    }

    async registerDocGia(data) {
        if (!data.dienthoaiDG || !data.matkhauDG || !data.confirmmatkhauDG) {
            throw new Error("Số điện thoại, mật khẩu, xác nhận mật khẩu là bắt buộc");
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(data.dienthoaiDG)) {
            throw new Error("Số điện thoại không hợp lệ, phải gồm 10 số và bắt đầu bằng số 0");
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(data.matkhauDG)) {
            throw new Error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số");
        }
        
        if (data.matkhauDG !== data.confirmmatkhauDG) {
            throw new Error("Mật khẩu xác nhận không khớp");
        }
        try {
            const dienthoaiDG = data.dienthoaiDG;
            const existingDocGia = await this.Docgia.findOne({ dienthoaiDG });
            if (existingDocGia) {
                throw new Error("Số điện thoại đã được đăng ký");
            }

            const hashedPassword = bcrypt.hashSync(data.matkhauDG, 10);
            const count = await this.Docgia.countDocuments();
            const maDocGia = `DG${String(count + 1).padStart(3, '0')}`;
            const newDocGia = {
                _id: new ObjectId(),
                maDG: maDocGia,
                tenDG: data.tenDG || "Chưa cập nhật",
                ngaysinh: data.ngaysinh || "Chưa cập nhật",
                gioitinh: data.gioitinh || "Chưa cập nhật",
                diachi: data.diachi || "Chưa cập nhật",
                dienthoaiDG: data.dienthoaiDG,
                matkhauDG: hashedPassword,
            };

            await this.Docgia.insertOne(newDocGia);
            return { message: "Đăng ký độc giả thành công", user: newDocGia };
        } catch (error) {
        console.error(error);
        throw error;
        }
    };
}

module.exports = DocgiaService;