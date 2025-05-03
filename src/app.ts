import dotenv from 'dotenv';
// Cargar variables de entorno antes de cualquier otra importación
dotenv.config({ path: '.env' });

import express from 'express';
import session from 'express-session';
import authRoutes from './routes/auth.routes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});