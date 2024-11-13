
import Overview from "@/components/home/Overview";
import Template from "./Template"

export default function Home() {
  const handleClick = () => {
    alert("Button clicked!");
  };
  return (
    <div>
      <Overview />
      {/* <Template /> */}
    </div>
  );
}
