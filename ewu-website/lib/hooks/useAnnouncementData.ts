import { useParams } from "next/navigation";
import { usePageData } from "./usePageData";

export function useNewsData() {
  const { news, notices, events, achievements } = usePageData();

  const { id } = useParams();

  const filteredNews = news?.find(
    (news) => news.id.toString() === id || news.slug === id
  );

  const filteredNotice = notices?.find(
    (notice) => notice.id.toString() === id || notice.slug === id
  );

  const filteredEvent = events?.find(
    (event) => event.id.toString() === id || event.slug === id
  );

  const filteredAchievement = achievements?.find(
    (achievement) => achievement.id.toString() === id || achievement.slug === id
  );

  return {
    news,
    notices,
    events,
    achievements,
    filteredNews,
    filteredNotice,
    filteredEvent,
    filteredAchievement,
  };
}
