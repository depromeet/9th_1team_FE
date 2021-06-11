export const shareAPI = async (
  descriptionA: string,
  descriptionB: string,
  url: string
) => {
  if (window.navigator && window.navigator.share) {
    try {
      await window.navigator.share({
        title: "토맛토",
        text: `${descriptionA} vs ${descriptionB}, 당신의 선택은?`,
        url,
      });
    } catch (e) {
      console.log(e);
    }
  }
};
