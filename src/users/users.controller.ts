import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
export class UsersController {
    @Get('admin')
    @Roles(Role.Admin)
    getAdminData() {
        return { message: 'Only admins can access this route' };
    }
}
