import { Schema, model } from 'mongoose';

interface User {
    email: string;
    name: string;
    token: string;
    createdAt: Date;
}

const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const UserModel = model<User>('User', userSchema);

export default UserModel;