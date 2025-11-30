/**
 * バッティングの成績一覧
 */
export interface BattingList {
  httpStatus: number;
  battingHistory: BattingHistory[];
}

/**
 * バッティングの成績
 */
export interface BattingHistory {
  PK: string;
  SK: string;
  createAt: string;
  myTeamName: string;
  opposingTeamName: string;
  records: [];
}
