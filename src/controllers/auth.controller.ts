import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public login = (req: Request, res: Response): void => {
        try {
            const authUrl = this.authService.getAuthUrl();
            console.log('Redirigiendo a:', authUrl);
            res.redirect(authUrl);
        } catch (error) {
            console.error('Error al generar URL de autenticación:', error);
            res.status(500).send('Error en la configuración de autenticación');
        }
    }

    public callback = async (req: Request, res: Response): Promise<void> => {
        const code = req.query.code;

        if (!code || typeof code !== 'string') {
            res.status(400).send('Se requiere código de autorización');
            return;
        }

        try {
            const userData = await this.authService.handleCallback(code);
            req.session.user = userData;
            res.redirect('/');
        } catch (error) {
            console.error('Error durante la autenticación:', error);
            res.status(500).send('La autenticación ha fallado');
        }
    }
}