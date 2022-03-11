import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice } from 'src/schemas/notice.schema';
import { PaginationQueryDto } from 'src/dto/PaginationQueryDto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
  ) {}

  // 모든 게시글 출력
  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Notice[]> {
    const { limit, offset } = paginationQueryDto;
    return await this.noticeModel.find().skip(offset).limit(limit).exec();
  }

  // 특정 검색어로 조회
  async search(param: string): Promise<Notice> {
    return;
  }
}
