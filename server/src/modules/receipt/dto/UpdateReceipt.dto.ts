import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiptDto } from './CreateReceipt.dto';

export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {}
