import {Controller, Get, Post, Body, Req, Delete, Param, Query, ParseBoolPipe} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { CreateReceiptDto } from './dto/CreateReceipt.dto';
import {AuthWithRole} from "../auth/decorators/AuthWithRole.decorator";
import {EmployeeRole} from "../../core/entities/Employee";
import {Request} from "express";
import {ParseDatePipe} from '@nestjs/common/pipes/parse-date.pipe';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findAll(@Query('employee_id') employee_id: string,
                @Query('startDate', new ParseDatePipe({optional: true})) startDate: Date,
                @Query('endDate', new ParseDatePipe({optional: true})) endDate: Date,
                @Query('detailed', new ParseBoolPipe({optional: true})) detailed: boolean
                ) {
    return await this.receiptService.getReceiptsSorted({
      employee_id,
      startDate,
      endDate,
      detailed
    });
  }

  @Get('sum')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findTotalReceiptSum(@Query('employee_id') employee_id: string,
                @Query('startDate', new ParseDatePipe({optional: true})) startDate: Date,
                @Query('endDate', new ParseDatePipe({optional: true})) endDate: Date
  ) {
    return await this.receiptService.getReceiptsSum({
      employee_id,
      startDate,
      endDate,
    });
  }

  @Get(':receipt_number')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findReceipt(@Param('receipt_number') receipt_number: string) {
    return await this.receiptService.getReceiptById(receipt_number, true);
  }

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async create(@Body() createReceiptDto: CreateReceiptDto, @Req() req: Request) {
    return await this.receiptService.create(req.employee, createReceiptDto);
  }

  @Delete(':receipt_number')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async delete(@Param('receipt_number') receiptNumber: string) {
    return await this.receiptService.remove(receiptNumber);
  }

  @Get('me/last')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findUserLastReceipt(@Req() req: Request) {
    return await this.receiptService.findUserLastReceipts(req.employee);
  }
}
