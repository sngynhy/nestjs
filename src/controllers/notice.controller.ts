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
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNoticeDto } from 'src/dto/notice/create-notice.dto';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { NoticeService } from 'src/services/notice.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateNoticeDto } from 'src/dto/notice/update-notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  // 공지사항 모두 출력 - 페이징처리: 한 페이지 당 10개씩
  @Get()
  async findAll(@Res() res, @Query() paginationQueryDto: PaginationQueryDto) {
    const notices = await this.noticeService.findAll(paginationQueryDto);
    return res.status(HttpStatus.OK).json(notices);
  }

  // 검색 함수 구현 추가 - 제목 or 내용 특정 키워드로 검색
  @Get('/search') // /notice/search?keyword=3 (쿼리스트링)
  async search(
    @Query('category') category: string,
    @Query('keyword') keyword: string,
    @Res() res,
  ) {
    const notices = await this.noticeService.keywordSearch(category, keyword);
    return res.status(HttpStatus.OK).json(notices);
  }

  // 공지사항 세부 데이터 조회
  @Get('/get/:id')
  async findOne(@Res() res, @Param('id') noticeId: string) {
    console.log(noticeId);
    const notice = await this.noticeService.findOne(noticeId);
    if (!notice) {
      throw new NotFoundException('Notice does not exist.');
    }
    return res.status(HttpStatus.OK).json(notice);
  }

  // 공지사항 등록
  @Post('/create')
  async createNotice(@Body() createNoticeDto: CreateNoticeDto, @Res() res) {
    try {
      // console.log(' createNotice', createNoticeDto);
      const notice = await this.noticeService.create(createNoticeDto);
      return res.status(HttpStatus.OK).json({
        message: 'Notice has been successfully created',
        notice,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Notice not created.',
      });
    }
  }

  // 공지사항 수정
  @Put('/update/:id')
  async updateNotice(
    @Param('id') noticeId: string,
    @Res() res,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    try {
      const notice = await this.noticeService.update(noticeId, updateNoticeDto);
      if (!notice) {
        throw new NotFoundException('Notice does not exist.');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Notice has been successfully updated',
        notice,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Notice not updated',
      });
    }
  }

  // 공지사항 삭제
  @Delete('/delete/:id')
  async deleteNotice(@Param('id') noticeId: string, @Res() res) {
    const notice = await this.noticeService.delete(noticeId);
    if (!notice) {
      throw new NotFoundException('Notice does not exist.');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Notice has been successfully deleted',
      notice,
    });
  }

  //   @Post('upload')
  //   @UseInterceptors(FileInterceptor('file'))
  //   uploadFile(@UploadedFile() file: Express.Multer.File) {
  //     console.log(file);
  //   }
}
