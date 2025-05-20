import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const routeParam = useParams();
  console.log(routeParam);

  return <div>ProjectPage:</div>;
}
