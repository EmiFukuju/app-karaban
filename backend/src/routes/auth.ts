import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_LIFESPAN, REFRESH_TOKEN_LIFESPAN } from '../config';

const router = Router();

// Registration route (existing)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route (new)
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userPayload = { id: user.id, email: user.email, name: user.name, userType: user.userType };

    const accessToken = jwt.sign(userPayload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_LIFESPAN });
    const refreshToken = jwt.sign(userPayload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_LIFESPAN });

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: userPayload,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
