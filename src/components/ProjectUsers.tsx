import MemberAvatar from "@/app/projects/components/MemberAvatar";
import AddMembers from "@/app/(dashboard)/dashboard/[id]/components/addMembers";

const ProjectUsers = ({ users, project, allUsers }: any) => {
  console.log("users", users);
  return (
    <div className="mt-2 flex items-center -space-x-2">
      {users?.map((user: any) => (
        <div key={user._id.toString()}>
          <MemberAvatar name={`${user?.first_name} ${user.last_name}`} />
        </div>
      ))}
      <AddMembers projectId={project._id} allUsers={allUsers} />
    </div>
  );
};

export default ProjectUsers;
