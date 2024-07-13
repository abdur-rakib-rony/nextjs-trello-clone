import { FC } from "react";
import MemberAvatar from "@/app/projects/components/MemberAvatar";
import AddMembers from "@/app/(dashboard)/dashboard/[id]/components/addMembers";
import { IUser } from "@/models/User";
import { IProject } from "@/models/Project";

interface ProjectUsersProps {
  users: IUser[];
  project: IProject;
  allUsers: IUser[];
}

const ProjectUsers: FC<ProjectUsersProps> = ({ users, project, allUsers }) => {
  return (
    <div className="mt-2 flex items-center -space-x-2">
      {users?.map((user: IUser) => (
        <div key={user._id.toString()}>
          <MemberAvatar name={`${user?.first_name} ${user.last_name}`} />
        </div>
      ))}
      <AddMembers projectId={project._id.toString()} allUsers={allUsers} />
    </div>
  );
};

export default ProjectUsers;
