import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import TableFloat from "../catalogue/subcomps/Table";
import { DottedPatternAreaChart } from "../meters/subcomps/dotted-chart";

const Home = () => {
  return (
    <div className="space-y-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Home;
