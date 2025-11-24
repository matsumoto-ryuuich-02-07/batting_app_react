import { useFetcher } from "react-router";
import type { Route } from "./+types/create-batting";
import { battingList } from "~/infrastructures/api/service/battings";
import { useLoaderData } from "react-router";
import type { BattingList } from "~/infrastructures/api/types/battings";
import { useActionData } from "react-router";
import { useEffect, useRef, useState } from "react";

// export function action({ request }: Route.ActionArgs) というサンプルも同じような用途でフォームからの値を取得出来そうではあるが、エラーとなった
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const records = formData.get("records");
  const opposingTeamName = formData.get("opposingTeamName");
  const myTeamName = formData.get("myTeamName");

  console.log(
    `成績： ${records} 相手チーム ${opposingTeamName} 自分のチーム ${myTeamName}`
  );

  const resultBattingList = await battingList();
  return { resultBattingList };
}

export const clientLoader = async () => {
  const resultBattingList = await battingList();
  // console.log("クライアントローダー");
  // return { resultBattingList };
};

// const [recordCount, setRecordCount] = useState();

export default function CreateBatting({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();
  console.log(fetcher.state);
  const action = useActionData<{ battingList: BattingList }>();
  useEffect(() => {
    if (fetcher.state == "idle") {
      formRef.current?.reset();
    }
    formRef.current?.reset();
  }, [fetcher]);

  console.log(actionData);
  console.log(loaderData);

  const [recordCount, setRecordCount] = useState(0);

  // const inputList = [
  //   <input type="text" placeholder="テキスト1" />,
  //   <input type="text" placeholder="テキスト2" />,
  //   <input type="text" placeholder="テキスト3" />,
  // ];

  const [inputList, setInputList] = useState<[In]>(<input type="text" placeholder={`テキスト${recordCount}`} />);

  const addInput = (): any => {
    setRecordCount(recordCount + 1);
    setInputList([      ...inputList,
      <input type="text" placeholder={`テキスト${recordCount}`} />]);

    console.log(recordCount);
  };

  // curl -X POST -H "Content-Type: application/json" -d '{"records":["安打"], "opposingTeamId": "uuidhogehoge", "opposingTeamName": "kamikaze", "myTeamId": "uuidhogehoge", "myTeamName": "札幌ホライゾン"}' https://m4lk70ck1j.execute-api.ap-northeast-1.amazonaws.com/dev/battings
  return (
    <div className="bg-amber-50 h-screen">
      <p onClick={addInput}>成績追加</p>
      {inputList.map((res: any) => {
        return res;
      })}

      <div className="p-4">
        <fetcher.Form method="post" ref={formRef}>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
            placeholder="結果"
            type="text"
            name="records"
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
            placeholder="相手チーム名"
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
            placeholder="自分のチーム名"
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
            name="send"
          >
            送信
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
