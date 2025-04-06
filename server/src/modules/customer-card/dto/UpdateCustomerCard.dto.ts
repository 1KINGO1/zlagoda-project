import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerCardDto } from './CreateCustomerCard.dto';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {}
