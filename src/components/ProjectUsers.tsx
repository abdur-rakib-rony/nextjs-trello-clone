import MemberAvatar from "@/app/projects/components/MemberAvatar";
import AddMembers from "@/app/(dashboard)/dashboard/[id]/components/addMembers";

interface ProjectUsersParams {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const ProjectUsers = ({ users, project, allUsers }: any) => {
  return (
    <div className="mt-2 flex items-center -space-x-2">
      {users?.map((user: any) => (
        <div key={user._id.toString()}>
          <MemberAvatar firstName={user?.first_name} />
        </div>
      ))}
      <AddMembers projectId={project._id} allUsers={allUsers}/>
    </div>
  );
};

export default ProjectUsers;
