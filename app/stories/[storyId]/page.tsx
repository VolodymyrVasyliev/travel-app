import React from "react";
import StoryDetails from "@/components/StoryDetails/StoryDetails";
import Popular from "@/components/Popular/Popular";

type Props = {
  params: Promise<{ storyId: string }>;
};

const storyId = async ({ params }: Props) => {
  const { storyId } = await params;
  console.log("story id:", storyId);

  return (
    <div>
      <StoryDetails />
      <Popular />
    </div>
  );
};

export default storyId;
