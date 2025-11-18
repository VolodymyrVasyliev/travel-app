"use client";
import React from "react";
import StoryDetails from "@/components/StoryDetails/StoryDetails";
import Popular from "@/components/Popular/Popular";
import { getCurrentStory } from "@/lib/api/clientApi";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Story } from "@/types/story";

const StoryDetailsClient = () => {
  const { storyId } = useParams<{ storyId: string }>();

  const { data: story } = useQuery<Story>({
    queryKey: ["story", storyId],
    queryFn: () => getCurrentStory(storyId),
    refetchOnMount: false,
  });
  console.log("StoryDetailsClient", story);

  return (
    <div>
      <StoryDetails data={story} />
      <Popular />
    </div>
  );
};

export default StoryDetailsClient;
