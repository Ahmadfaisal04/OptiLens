import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from './shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KatarakModule } from './katarak/katarak.module';
import { ArtikelModule } from './artikel/artikel.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Replace with an environment variable for security
      signOptions: { expiresIn: '1h' }, // Token validity
      global : true
    }),
    SharedModule,
    AuthModule,
    UserModule,
    KatarakModule,
    ArtikelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
