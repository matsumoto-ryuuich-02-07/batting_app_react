import { HTTP_STATUS } from "~/infrastructures/api/constants/httpStatus";

const SUCCESS_CODE = [
  HTTP_STATUS.OK,
  HTTP_STATUS.CREATED,
  HTTP_STATUS.ACCEPTED,
  HTTP_STATUS.NON_AUTHORITATIVE_INFORMATION,
  HTTP_STATUS.NO_CONTENT,
  HTTP_STATUS.RESET_CONTENT,
  HTTP_STATUS.PARTIAL_CONTENT,
];

export const isSuccess = (httpStatus: any): boolean => {
  return SUCCESS_CODE.includes(httpStatus);
};
