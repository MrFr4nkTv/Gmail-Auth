import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user: {
            user: {
                name: string;
                email: string;
                picture?: string;
            };
            tokens: {
                access_token: string;
                refresh_token?: string;
            };
        };
    }
}