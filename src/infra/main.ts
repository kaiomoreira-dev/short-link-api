import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(EnvService)

  // Habilita o CORS com configurações
  app.enableCors({
    origin: '*', // Define os domínios permitidos, ou use '*' para todos os domínios
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Headers permitidos
    credentials: true, // Para permitir cookies
  })

  const port = configService.get('PORT')

  await app.listen(port)
}
bootstrap()
