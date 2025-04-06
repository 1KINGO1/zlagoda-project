import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {LoginDto} from "./dto/Login.dto";
import {EmployeeService} from "../employee/employee.service";
import {JwtService} from "@nestjs/jwt";
import * as argon2 from 'argon2';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}


  async login(loginDto: LoginDto) {
    const employee = await this.employeeService.getEmployeeByLogin(loginDto.login);
    if (!employee) {
      throw new NotFoundException("Employee Not Found");
    }

    try {
      const hashMatch = await argon2.verify(employee.password_hash, loginDto.password);
      if (!hashMatch) throw 'passwords do not match';
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Invalid Credentials");
    }

    const jwt = await this.jwtService.signAsync(
      {
        id_employee: employee.id_employee
      },
      {
        secret: this.configService.getOrThrow("JWT_SECRET"),
        expiresIn: "30d",
      }
    );

    return {
      token: jwt
    }
  }
}
