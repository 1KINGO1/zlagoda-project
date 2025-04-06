import {IsBoolean, IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength, Validate} from "class-validator";
import {IsValidNumberConstraint} from "../../../core/constraints/IsValidNumber.constraint";

export class CreateStoreProductDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  id_product: number

  @IsNotEmpty()
  @Min(0)
  @Validate(IsValidNumberConstraint)
  selling_price: number

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  products_number: number

  @IsBoolean()
  @IsNotEmpty()
  promotional_product: boolean
}
