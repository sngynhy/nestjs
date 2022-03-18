export class CreateNoticeDto {
  readonly category: string;
  readonly access: string;
  readonly uploadReserve: string;
  readonly createdAt: Date; // 예약 발행 시 입력받을 날짜
  readonly important: boolean;
  readonly title: string;
  readonly content: string;
  readonly writer: string;
  readonly uploadFile: string;
}
