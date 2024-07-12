import LinksBreadcrumb from "@/components/LinksBreadcrumb";
import ProjectUsers from "@/components/ProjectUsers";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <div>
      <LinksBreadcrumb urlLink="dashboard"/>
      <ProjectUsers />
    </div>
  );
};

export default Dashboard;
