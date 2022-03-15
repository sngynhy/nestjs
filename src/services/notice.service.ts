import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice } from 'src/schemas/notice.schema';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { CreateNoticeDto } from 'src/dto/create-notice.dto';
import { UpdateNoticeDto } from 'src/dto/update-notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
  ) {}

  // 모든 게시글 출력 - 페이징처리
  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Notice[]> {
    const { limit, offset } = paginationQueryDto;
    return await this.noticeModel.find().skip(offset).limit(limit).exec();
  }

  // 현재 시점으로 발행된 게시글 출력

  // 발행 예약 게시글 출력

  // 특정 검색어로 조회 - 제목 or 내용
  async keywordSearch(keyword: string): Promise<Notice[]> {
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(keyword);

    const notice = await this.noticeModel
      .find({ title: searchRgx, $options: 'i' }) // $options: 'i' - 대소문자 구분 X
      .exec();
    if (!notice) {
      throw new NotFoundException('검색 결과 없음');
    }
    return notice;
  }

  // 태그로 검색
  async tagSearch(keyword: string): Promise<Notice[]> {
    const notice = await this.noticeModel.find({ tag: keyword }).exec();
    if (!notice) {
      throw new NotFoundException('검색 결과 없음');
    }
    return notice;
  }

  // 공지사항 세부 데이터
  async findOne(noticeId: string): Promise<Notice> {
    const notice = await this.noticeModel.findById({ _id: noticeId }).exec();
    if (!notice) {
      throw new NotFoundException(`Notice #${noticeId} not found`);
    }
    return notice;
  }

  // 공지사항 등록
  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    try {
      const newNotice = await new this.noticeModel(createNoticeDto);
      return newNotice.save();
    } catch (err) {
      console.log(err);
    }
  }

  // 공지사항 수정
  async update(
    noticeId: string,
    updateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    const updatedNotice = await this.noticeModel
      .findByIdAndUpdate({ _id: noticeId }, updateNoticeDto)
      .exec();

    return updatedNotice;
  }

  // 공지사항 삭제
  async delete(noticeId: string): Promise<Notice> {
    const deletedNotice = await this.noticeModel
      .findByIdAndDelete({
        _id: noticeId,
      })
      .exec();

    if (!deletedNotice) {
      throw new NotFoundException(`Notice #${noticeId} not found`);
    }
    return deletedNotice;
  }
}
