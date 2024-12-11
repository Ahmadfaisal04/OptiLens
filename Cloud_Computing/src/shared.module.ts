import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';

@Global()
@Module({
    providers : [PrismaService, AuthService],
    exports : [PrismaService, AuthService]
})
export class SharedModule {}
