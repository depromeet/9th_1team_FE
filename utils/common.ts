import _ from "lodash";

export const getBalanceGameSelections = (data: any) => {
  return _.sortBy(data.balanceGameSelections, (a: any) => a.order);
};

export const clipboardCopy = (text: string) => {
  if (!document.queryCommandSupported("copy")) {
    return alert("클립보드가 지원되지 않는 브라우저입니다.");
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  // 사파리 브라우저 서포팅
  textarea.focus();
  // 사용자가 입력한 내용을 영역을 설정할 때 필요
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  return null;
};
