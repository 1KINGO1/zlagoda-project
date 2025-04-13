import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseInterceptors} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {CreateEmployeeDto} from "./dto/CreateEmployee.dto";
import {RemoveSensitiveFieldsInterceptor} from "../../core/interceptors/RemoveSensitiveFields.interceptor";
import {SortOrderPipe} from "../../core/pipes/SortOrder.pipe";
import {AuthWithRole} from "../auth/decorators/AuthWithRole.decorator";
import {EmployeeRole} from "../../core/entities/Employee";
import {UpdateEmployeeDto} from "./dto/UpdateEmployee.dto";
import {Request} from "express";
import {SortOrder} from "../../core/types/SortOrder";
import {Auth} from '../auth/decorators/Auth.decorator';

@Controller('employee')
@UseInterceptors(RemoveSensitiveFieldsInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  // @AuthWithRole([EmployeeRole.MANAGER])
  async createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeeService.createEmployee(body);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER])
  async getEmployees(@Query('sort', new SortOrderPipe()) sort?: SortOrder,
                     @Query('surname') surname?: string) {
    return this.employeeService.getEmployeesSorted({surname, order: sort});
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  async deleteEmployee(@Param('id') id: string, @Req() req: Request) {
    return this.employeeService.deleteEmployee(req.employee, id);
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  async updateEmployee(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(id, body);
  }

  @Get('me')
  @Auth()
  async getMe(@Req() req: Request) {
    return this.employeeService.getEmployeeById(req.id_employee);
  }
}
