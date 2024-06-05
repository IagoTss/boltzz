// excel.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Workbook } from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExcelService {
  constructor(private readonly prisma: PrismaService) {}

  async generatePedidosExcel(response: Response) {
    // Cria uma nova planilha
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Pedidos');

    // Define as colunas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nome Solicitante', key: 'nome_solicitante', width: 30 },
      { header: 'Telefone', key: 'telefone', width: 20 },
      { header: 'CEP Origem', key: 'cep_origem', width: 15 },
      { header: 'CEP Destino', key: 'cep_destino', width: 15 },
    ];

    // Obtém os dados do banco de dados
    const pedidos = await this.prisma.pedidos.findMany();

    // Adiciona os dados na planilha
    pedidos.forEach((pedido) => {
      worksheet.addRow(pedido);
    });

    // Configura o cabeçalho da resposta para download de arquivo Excel
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=pedidos.xlsx'
    );

    // Escreve os dados na resposta
    await workbook.xlsx.write(response);
    response.end();
  }
}
