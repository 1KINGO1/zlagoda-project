import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/CreateStoreProduct.dto';
import { UpdateStoreProductDto } from './dto/UpdateStoreProduct.dto';
import {AuthWithRole} from "../auth/decorators/AuthWithRole.decorator";
import {EmployeeRole} from "../../core/entities/Employee";
import {SortOrderPipe} from "../../core/pipes/SortOrder.pipe";
import {SortOrder} from "../../core/types/SortOrder";
import {OptionalParseIntPipe} from "../../core/pipes/OptionalParseInt.pipe";

@Controller('store-product')
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  create(@Body() createStoreProductDto: CreateStoreProductDto) {
    return this.storeProductService.create(createStoreProductDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(
    @Query('sortByAmount', new SortOrderPipe()) sortByAmount?: SortOrder,
  ) {
    return this.storeProductService.getStoreProductsSorted({sortByAmount});
  }

  @Get(":upc")
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findOne(
    @Param('upc') upc: string
  ) {
    return this.storeProductService.getStoreProductByUpcWithProductInfo(upc);
  }

  @Patch(':upc')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  update(@Param('upc') upc: string, @Body() updateStoreProductDto: UpdateStoreProductDto) {
    return this.storeProductService.updateStoreProduct(upc, updateStoreProductDto);
  }


  @Delete(':upc')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  remove(@Param('upc') upc: string) {
    return this.storeProductService.deleteStoreProduct(upc);
  }
}
