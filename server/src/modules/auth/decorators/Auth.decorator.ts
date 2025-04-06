import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../guards/Auth.guard";

export const Auth = () => UseGuards(AuthGuard);
