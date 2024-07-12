import LinksBreadcrumb from "@/components/LinksBreadcrumb";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <div>
      <LinksBreadcrumb urlLink="dashboard" />
    </div>
  );
};

export default Dashboard;
