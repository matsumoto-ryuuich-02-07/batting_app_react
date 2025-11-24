import { battingList } from "~/infrastructures/api/service/battings";
import type { Route } from "../batting-history/components/+types/BattingHistory";
import type { BattingHistory } from "~/infrastructures/api/types/battings";
import { isSuccess } from "~/features/utiles/apiResponse";

/**
 * React Router v7以降の(もしかするとv6.4には既にある？)clientLoaderを使用する
 * 画面遷移時にuseEffect無しでもAPIリクエスト出来るよう(レンダリング)可能
 */
export const clientLoader = async () => {
  const resultBattingList = await battingList();
  return { resultBattingList };
};

const BattingHistory = ({ loaderData }: Route.ComponentProps) => {
  const { resultBattingList } = loaderData;

  return (
    <>
      {isSuccess(resultBattingList.httpStatus) ? <p>成功</p> : <p>失敗</p>}
      {resultBattingList.battingHistory.map(
        (battingHistory: BattingHistory, index: any) => {
          return (
            <div key={index}>
              <p>{battingHistory.PK}</p>
              <p>{battingHistory.SK}</p>
              <p>{battingHistory.createAt}</p>
              <p>{battingHistory.myTeamName}</p>
              <p>{battingHistory.opposingTeamName}</p>
              <p>{battingHistory.records}</p>
            </div>
          );
        }
      )}
    </>
  );
};

export default BattingHistory;
