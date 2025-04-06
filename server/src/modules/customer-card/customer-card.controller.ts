import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {CustomerCardService} from './customer-card.service';
import {CreateCustomerCardDto} from './dto/CreateCustomerCard.dto';
import {UpdateCustomerCardDto} from './dto/UpdateCustomerCard.dto';
import {AuthWithRole} from "../auth/decorators/AuthWithRole.decorator";
import {EmployeeRole} from "../../core/entities/Employee";
import {SortOrderPipe} from "../../core/pipes/SortOrder.pipe";
import {SortOrder} from "../../core/types/SortOrder";
import {OptionalParseIntPipe} from '../../core/pipes/OptionalParseInt.pipe';

@Controller('customer-card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(
    @Query('sort', new SortOrderPipe()) sort?: SortOrder,
    @Query('surname') surname?: string,
    @Query('percent', new OptionalParseIntPipe()) percent?: number
  ) {
    return this.customerCardService.getCustomerCardSorted({sort, cust_surname: surname, percent});
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  update(@Param('id') id: string, @Body() updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerCardService.update(id, updateCustomerCardDto);
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  remove(@Param('id') id: string) {
    return this.customerCardService.remove(id);
  }
}
