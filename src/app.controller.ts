import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ExcelService } from './excel.service';
import { PrismaService } from './prisma.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
    private readonly excelService: ExcelService
  ) {}

  @Get('/')
  getHello() {
    return this.appService.getHello();
  }

  @Post('/EnviarDados')
  async envio(@Body() data) {
    console.log('Recebendo dados do formulário:', data); // Log dos dados recebidos
    try {
      const {
        cep_origem,
        cep_destino,
        telefone,
        nome
      } = data;

      // Usando o Prisma Service para criar um novo pedido
      const novoPedido = await this.prismaService.pedidos.create({
        data: {
          cep_origem,
          cep_destino,
          nome_solicitante: nome,
          telefone
        }
      });

      return {
        message: 'Pedido criado com sucesso',
        data: novoPedido
      };
    } catch (error) {
      console.error('Erro ao criar pedido:', error.message); // Log do erro
      return {
        message: 'Erro ao criar pedido',
        error: error.message
      };
    }
  }

  @Get('excel/pedidos')
  async getPedidosExcel(@Res() response: Response) {
    await this.excelService.generatePedidosExcel(response);
  }
}
