import { Role } from '../../common/enums/role.enum';

export interface User {
    _id: string;
    email: string;
    password: string;
    role: Role;
    refreshToken?: string;
}
