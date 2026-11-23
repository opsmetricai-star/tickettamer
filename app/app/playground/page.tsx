import { Title } from "../ui";
import { Playground } from "./client";

export default function Page() {
  return <div className="space-y-6"><Title title="Playground" sub="Chat with your agent. Answers are grounded in your knowledge and use one credit each." /><Playground /></div>;
}
