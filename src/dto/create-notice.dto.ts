export class CreateNoticeDto {
  readonly _no: number;
  readonly state: string;
  readonly title: string;
  readonly content: string;
  readonly uploadDate: Date;
  readonly writer: string;
  readonly tags: string[];
}
