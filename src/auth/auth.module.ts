import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({}), PrismaModule], //Because prisma module is decorated with @Global, it can be removed from this import
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
