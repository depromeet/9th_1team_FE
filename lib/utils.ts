import dayjs from "dayjs";

export const countDate = (createdAt: string) => {
  const today = dayjs(new Date()).format("YYYY-MM-DD HH:mm");
  if (dayjs(today).diff(createdAt, "days") > 0)
    return `${dayjs(today).diff(createdAt, "days")}일전`;

  if (dayjs(today).diff(createdAt, "hours") > 0)
    return `${dayjs(today).diff(createdAt, "hours")}시간전`;

  if (dayjs(today).diff(createdAt, "minutes") > 0)
    return `${dayjs(today).diff(createdAt, "minutes")}분전`;

  return "방금전";
};
