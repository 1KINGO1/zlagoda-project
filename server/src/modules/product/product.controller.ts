import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/CreateProduct.dto';
import {UpdateProductDto} from './dto/UpdateProduct.dto';
import {AuthWithRole} from "../auth/decorators/AuthWithRole.decorator";
import {EmployeeRole} from "../../core/entities/Employee";
import {SortOrderPipe} from "../../core/pipes/SortOrder.pipe";
import {SortOrder} from "../../core/types/SortOrder";
import {OptionalParseIntPipe} from "../../core/pipes/OptionalParseInt.pipe";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER])
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(
    @Query('sort', new SortOrderPipe()) sort?: SortOrder,
    @Query('category_number', new OptionalParseIntPipe()) category_number?: number,
    @Query('name') name?: string,
  ) {
    return this.productService.getProductsSorted({sort, category_number, name});
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.remove(id);
  }
}
