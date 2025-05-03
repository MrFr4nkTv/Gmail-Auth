// src/controllers/user.controller.ts

import { Request, Response } from 'express';
import UserModel from '../models/user.model';

export class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}