import {applyDecorators, SetMetadata, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../guards/Auth.guard";
import {EmployeeRole} from "../../../core/entities/Employee";
import {RolesGuard} from "../guards/Roles.guard";

export const AuthWithRole = (roles: EmployeeRole[]) => {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard), UseGuards(RolesGuard));
}
