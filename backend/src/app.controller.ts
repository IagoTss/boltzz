import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ExcelService } from './excel.service';
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

  @Post('/enviarDados')
  async envio(@Body() data) {
    try {
      const { cep_origem, cep_destino, telefone, nome } = data;

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
      return {
        message: 'Erro ao criar pedido',
        error: error.message
      };
    }
  }

  @Get('/pedidos')
  async getPedidos() {
    try {
      const pedidos = await this.prismaService.pedidos.findMany();
      return pedidos;
    } catch (error) {
      return {
        message: 'Erro ao buscar pedidos',
        error: error.message
      };
    }
  }

  @Get('/excel/pedidos')
  async getPedidosExcel(@Res() response: Response) {
    await this.excelService.generatePedidosExcel(response);
  }
}
