import React from "react";
import StoryDetails from "@/components/StoryDetails/StoryDetails";

type Props = {
  params: Promise<{ storyId: string }>;
};

const storyId = async ({ params }: Props) => {
  const { storyId } = await params;
  console.log("story id:", storyId);
  return (
    <>
      <h2>Story</h2>
      <StoryDetails />
    </>
  );
};

export default storyId;
