import { getServerCurrentStory } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import StoryDetailsClient from "@/app/stories/[storyId]/StoryDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ storyId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { storyId } = await params;
  const story = await getServerCurrentStory(storyId);
  return {
    title: `Story: ${story.title} `,
    description: `Story description: ${story.article?.slice(0, 10)}...`,
    openGraph: {
      title: `Story: ${story.title} `,
      description: `Story description: ${story.article?.slice(0, 10)} ...`,
      siteName: "Подорожнік",
      url: `travel-app-teal-kappa.vercel.app/stories/${storyId}`,
    },
  };
}

const StoryPage = async ({ params }: Props) => {
  const { storyId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["story", storyId],
    queryFn: () => getServerCurrentStory(storyId),
  });
  console.log("StoryPage", storyId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetailsClient />
    </HydrationBoundary>
  );
};

export default StoryPage;
