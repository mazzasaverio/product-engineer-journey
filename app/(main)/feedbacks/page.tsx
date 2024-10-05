import NavbarFeedbacks from "./_components/NavbarFeedbacks";
import FeedbackEditor from "@/components/feedbacks/editor/FeedbackEditor";
import Feedbacks from "@/components/Feedbacks";

export default function HomeFeedback() {
  return (
    <>
      <NavbarFeedbacks />
      <main className="mx-auto w-full max-w-4xl p-4 sm:max-w-3xl lg:max-w-2xl">
        <FeedbackEditor />
        <div className="mt-8">
          <Feedbacks />
        </div>
      </main>
    </>
  );
}
