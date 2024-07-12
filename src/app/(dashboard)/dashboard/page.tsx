import Projects from "@/app/projects/page";
import LinksBreadcrumb from "@/components/LinksBreadcrumb";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <div>
      <LinksBreadcrumb name="dashboard" link="/dashboard" />
      <Projects />
    </div>
  );
};

export default Dashboard;
