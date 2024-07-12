import MemberAvatar from "@/app/(dashboard)/projects/components/MemberAvatar";

const ProjectUsers = ({ users }: any) => {
  return (
    <div className="flex justify-center -space-x-2">
      {users?.map((user: any) => {
        <MemberAvatar firstName={user?.first_name} />;
      })}
    </div>
  );
};

export default ProjectUsers;
