import { OAuth2Client } from 'google-auth-library';
import { Credentials } from 'google-auth-library';

export class AuthService {
    private oauth2Client: OAuth2Client;
    private static users = new Map();

    constructor() {
        console.log('Environment variables:', {
            clientId: process.env.GMAIL_CLIENT_ID,
            redirectUri: process.env.GMAIL_REDIRECT_URI
        });

        if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
            throw new Error('Missing required Google OAuth credentials');
        }

        this.oauth2Client = new OAuth2Client({
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            redirectUri: process.env.GMAIL_REDIRECT_URI || 'http://localhost:3000/auth/callback'
        });
    }

    public getAuthUrl(): string {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ],
            prompt: 'consent'
        });
    }

    public async handleCallback(code: string): Promise<any> {
        try {
            const { tokens } = await this.oauth2Client.getToken(code);
            
            if (!tokens.access_token) {
                throw new Error('No access token returned');
            }

            const userInfo = await this.getUserInfo(tokens.access_token);
            
            // Store user in memory
            AuthService.users.set(userInfo.email, {
                name: userInfo.name,
                email: userInfo.email,
                token: tokens.access_token,
                createdAt: new Date()
            });

            return {
                user: userInfo,
                tokens
            };
        } catch (error) {
            console.error('Error handling callback:', error);
            throw error;
        }
    }

    private async getUserInfo(accessToken: string): Promise<any> {
        if (!accessToken) {
            throw new Error('Access token is required');
        }

        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error getting user info:', error);
            throw error;
        }
    }
}