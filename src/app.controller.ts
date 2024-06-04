import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    return this.appService.getHello(); 
  }
  @Post('/EnviarDados')
  async envio(@Body() data) {
    const Prisma = new PrismaClient();
    try {
      const {
        cep_origem,
        cep_destino,
        telefone,
        nome
      } = data;

      // Usando o Prisma Client para criar um novo pedido
      const novoPedido = await Prisma.pedidos.create({
        data: {
          cep_origem:cep_origem,
          cep_destino:cep_destino,
          nome_solicitante:nome,
          telefone:telefone

        }
      });

      return {
        message: 'Pedido criado com sucesso',
        data: novoPedido
      };
    } catch (error) {
      return {
        message: 'Erro ao criar pedido',
        error: error.message
      };
    }
  }
}
