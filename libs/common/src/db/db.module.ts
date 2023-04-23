import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DbModule {
    static forRoot(entities): DynamicModule {
        return {
            module: DbModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    useFactory: (configService: ConfigService) => ({
                        type: 'postgres',
                        host: configService.get<string>('POSTGRES_HOST'),
                        port: configService.get('POSTGRES_PORT'),
                        username: configService.get<string>('POSTGRES_USER'),
                        password: configService.get<string>('POSTGRES_PASSWORD'),
                        database: configService.get<string>('POSTGRES_DB'),
                        entities,
                        synchronize: true
                    }),
                    inject: [ConfigService],
                }),
            ],
        };
    }
}