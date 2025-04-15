import { PRE_EXPIRED_TIME } from "../../const";

const isExpired = (expireTime: number | string): boolean => {
  try {
    const time = new Date(+expireTime)?.getTime();

    return time - PRE_EXPIRED_TIME <= Date.now(); // 40 seconds
  } catch (error) {
    console.error("🚀 ~ isExpired ~ error:", error);

    return true;
  }
};

export default isExpired;
