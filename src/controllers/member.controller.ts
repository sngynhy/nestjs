import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMemberDto } from 'src/dto/create-member.dto';
import { UpdateMemberDto } from 'src/dto/update-member.dto';
import { MemberService } from 'src/services/member.service';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  async getAllMembers() {
    const members = await this.memberService.findAll();
    return members;
  }

  @Get('/:email')
  async getMember(@Param('email') email: string, @Res() res) {
    const member = await this.memberService.findOne(email);
    if (!member) {
      throw new NotFoundException('Member does not exist!');
    }
    return res.status(HttpStatus.OK).json(member);
  }

  @Post()
  async createMember(@Res() res, @Body() createMemberDto: CreateMemberDto) {
    try {
      console.log(createMemberDto);
      const member = await this.memberService.create(createMemberDto);
      return res.status(HttpStatus.OK).json({
        message: 'Member has been created successfully',
        member,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Member not created!',
      });
    }
  }

  @Put(':/email')
  async udpateMember(
    @Param('email') email: string,
    @Res() res,
    @Body() udpateMemberDto: UpdateMemberDto,
  ) {
    try {
      const member = await this.memberService.update(email, udpateMemberDto);
      if (!member) {
        throw new NotFoundException('Member does not exist!');
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Member not updated!',
      });
    }
  }

  @Delete(':/email')
  async deleteMember(@Param('email') email: string, @Res() res) {
    const member = await this.memberService.delete(email);
    if (!member) {
      throw new NotFoundException('Member does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Member has been deleted',
      member,
    });
  }
}
