import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberDto } from 'src/dto/create-member.dto';
import { UpdateMemberDto } from 'src/dto/update-member.dto';
import { Member } from 'src/schemas/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async findOne(email: string): Promise<Member> {
    const member = await this.memberModel.findOne({ email: email }).exec();
    if (!member) {
      throw new NotFoundException(`Member #${email} not found`);
    }
    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const createMember = new this.memberModel(createMemberDto);
    return createMember.save();
  }

  async update(email: string, updateMemberDto: UpdateMemberDto) {
    const existMember = await this.memberModel.findOneAndUpdate(
      { email: email },
      updateMemberDto,
    );
    if (!existMember) {
      throw new NotFoundException(`Member #${email} not found`);
    }
    return existMember;
  }

  async delete(email: string) {
    const deleteMember = await this.memberModel.findOneAndDelete({
      email: email,
    });
    return deleteMember;
  }
}
