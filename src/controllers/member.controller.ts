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
  UseGuards,
} from '@nestjs/common';
import { CreateMemberDto } from 'src/dto/member/create-member.dto';
import { UpdateMemberDto } from 'src/dto/member/update-member.dto';
import { LoginMemberDto } from 'src/dto/member/login-member.dto';
import { MemberService } from 'src/services/member.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('member')
export class MemberController {
  constructor(
    private memberService: MemberService,
    private authService: AuthService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllMembers() {
    const members = await this.memberService.findAll();
    return members;
  }

  @Get('get/:email') // member/get/email@email.com
  async getMember(@Param('email') email: string, @Res() res) {
    const member = await this.memberService.findOne(email);
    if (!member) {
      throw new NotFoundException('Member does not exist!');
    }
    return res.status(HttpStatus.OK).json(member);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Body() loginMemberDto: LoginMemberDto) {
    // console.log('@@@', loginMemberDto);
    return this.authService.validateMember(
      loginMemberDto.email,
      loginMemberDto.password,
    );
  }

  @Post('/create')
  async createMember(@Res() res, @Body() createMemberDto: CreateMemberDto) {
    try {
      console.log(createMemberDto);
      const member = await this.memberService.create(createMemberDto);
      return res.status(HttpStatus.OK).json({
        message: 'Member has been created successfully',
        member,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Member not created!',
      });
    }
  }

  @Put('/update/:email')
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
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Member not updated!',
      });
    }
  }

  // 다수 회원 삭제 처리
  // id or email을 배열로 받아 넘겨주기
  @Delete('/delete/:email')
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
