import axios from "axios";
import { ScannerError, HttpStatusCode } from "../exceptions/scannerError";

export default class KeycloakService {

    checkAccess = async (): Promise<boolean> => {
        
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // This line disables SSL certificate validation, use only for debugging purposes

        const axios = require('axios');
        const https = require('https');
        const tls = require('tls');

        console.log("about to launch agent");

        const agent = new https.Agent({
            rejectUnauthorized: false,
            secureContext: tls.createSecureContext({ 
                minVersion: 'TLSv1.2', // Specify the minimum TLS version
                maxVersion: 'TLSv1.2'  // Specify the maximum TLS version
              })
        });
        
        console.log("agent created")
        
        const users = await axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`, {
        httpsAgent: agent // Use the custom HTTPS agent
        });
    
        console.log(users)

        return true;
    }

    getNewClientAccessToken = async (): Promise<string> => {
        const response = await axios.post(`${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`, {
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            grant_type: 'client_credentials'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data.access_token;
    }

    getUsers = async (): Promise<any> => {
        const accessToken = await this.getNewClientAccessToken();

        const response = await axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    }

    getUser = async (id: string): Promise<any> => {
        const accessToken = await this.getNewClientAccessToken();

        const response = await axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    }

    createUser = async (newUser: any) : Promise<string> => {
        const accessToken = await this.getNewClientAccessToken();

        const response = await axios.post(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`, {
            id: newUser.uuid,
            firstName: newUser.firstname,
            lastName: newUser.lastname,
            username: newUser.email.split('@')[0],
            enabled: true,
            credentials: [{
                type: 'password',
                value: newUser.password,
                temporary: false
            }]
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(response.status !== 201) {
            throw new ScannerError({
                httpStatusCode: response.status,
                description: response.data.errorMessage,
                isOperational: true
            });
        }

        return response.headers.location.split('/').pop();
    }

    updateUser = async (id: string, updatedUser: any) => {
        const accessToken = await this.getNewClientAccessToken();

        const response = await axios.put(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
            id: updatedUser.uuid,
            firstName: updatedUser.firstname,
            lastName: updatedUser.lastname,
            username: updatedUser.email.split('@')[0],
            email: updatedUser.email,
            enabled: true,
            credentials: [{
                type: 'password',
                value: updatedUser.password,
                temporary: false
            }]
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(response.status !== 204) {
            throw new ScannerError({
                httpStatusCode: response.status,
                description: response.data.errorMessage,
                isOperational: true
            });
        }

        return response.data;
    }

    deleteUser = async (id: string) => {
        const accessToken = await this.getNewClientAccessToken();

        const response = await axios.delete(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(response.status !== 204) {
            throw new ScannerError({
                httpStatusCode: response.status,
                description: response.data.errorMessage,
                isOperational: true
            });
        }

        return response.data;
    }
}