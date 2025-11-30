import { API_URL } from "../constants/apiUrl";
import { HTTP_METHOD } from "../constants/httpMethod";
import { HTTP_STATUS } from "../constants/httpStatus";
import type { BattingHistory, BattingList } from "../types/battings";
/**
 * バッティングの成績一覧
 *
 */
export const battingList = async (): Promise<BattingList> => {
  let resultBattingList: BattingList = {
    httpStatus: 0,
    battingHistory: [],
  };

  try {
    // lambda側のレスポンスヘッダーにCORSの設定をしないとエラーになる
    const data = await fetch(API_URL.BATTINGS, {
      method: HTTP_METHOD.GET,
    });

    if (!data.ok) {
      resultBattingList.httpStatus = HTTP_STATUS.BAD_REQUEST;
      return resultBattingList;
    }

    const jsonData = await data.json();
    resultBattingList.httpStatus = HTTP_STATUS.OK;
    resultBattingList.battingHistory = jsonData;
    return resultBattingList;
  } catch (e: unknown) {
    resultBattingList.httpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return resultBattingList;
  }
};
