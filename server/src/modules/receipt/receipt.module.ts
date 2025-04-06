import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import {EmployeeModule} from '../employee/employee.module';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService],
  imports: [EmployeeModule],
})
export class ReceiptModule {}
