import { UserAccount } from './../models/userAccount.model';
import { Get, Post, Query, Route, Tags, Path, Controller, SuccessResponse, Response, Body, Put, Delete, Res } from 'tsoa';
import UserAccountService from '../services/userAccount.service'
import { HttpStatusCode, ScannerError } from '../exceptions/scannerError';

@Route('users')
@Tags('UserAccount Controller Routes')
export class UserAccountController extends Controller {
    userAccountService: UserAccountService = new UserAccountService();

    @Get('/')
    @SuccessResponse('200', 'OK')
    public async getUsers(): Promise<UserAccount[]> {
        try {
            return await this.userAccountService.getUsers();
        }
        catch (error) {
            throw error;
        }
    }

    @Get('{uuid}')
    @SuccessResponse('200', 'OK')
    @Response<ScannerError>(HttpStatusCode.NOT_FOUND, 'User not found')
    public async getUser(
        @Path() uuid: string
    ): Promise<UserAccount | null> {
        try {
            return await this.userAccountService.getUser(uuid);
        }
        catch (error) {
            throw error;
        }
    }

    @Post('/')
    @SuccessResponse('201', 'Created')
    @Response<ScannerError>(HttpStatusCode.BAD_REQUEST, 'Bad Request')
    @Response<ScannerError>(HttpStatusCode.CONFLICT, 'User already exists')
    public async createUser(
        @Body() body: UserAccount
    ): Promise<string> {
        try {
            const response: UserAccount = await this.userAccountService.createUser(body);
            return 'Created user account successfully: ' + response.uuid;
        }
        catch (error) {
            throw error;
        }
    }

    
    @Put('{uuid}')
    @SuccessResponse('200', 'Updated')
    @Response<ScannerError>(HttpStatusCode.BAD_REQUEST, 'Bad Request')
    @Response<ScannerError>(HttpStatusCode.NOT_FOUND, 'User not found')
    public async updateUser(
        @Path() uuid: string,
        @Body() body: UserAccount
    ): Promise<string> {
        try {
            await this.userAccountService.updateUser(uuid, body);
            return 'Updated user account successfully';
        }
        catch (error) {
            throw error;
        }
    }

    @Delete('{uuid}')
    @SuccessResponse('200', 'Deleted')
    @Response<ScannerError>(HttpStatusCode.NOT_FOUND, 'User not found')
    public async deleteUser(
        @Path() uuid: string
    ): Promise<string> {
        try {
            await this.userAccountService.deleteUser(uuid);
            return 'Deleted user account successfully';
        }
        catch (error) {
            throw error;
        }
    }
}

