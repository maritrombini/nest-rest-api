import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionHttpFilter } from './user/exceptionHttp.filter';
import { TransformResponseInterceptor } from './core/http/transformResponse.interceptor';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHttpFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
