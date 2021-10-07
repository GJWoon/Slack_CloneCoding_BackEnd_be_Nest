import { ApiProperty } from "@nestjs/swagger";
import { JoinRequestDto } from "../../users/dto/join.request.dto";

export default class UserDto extends JoinRequestDto {

  id: number;
}
