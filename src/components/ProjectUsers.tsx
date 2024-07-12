import MemberAvatar from "@/app/projects/components/MemberAvatar";
import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";

const ProjectUsers = ({ users }: any) => {
  return (
    <div className="mt-2 flex items-center -space-x-2">
      {users?.map((user: any) => (
        <div key={user._id}>
          <MemberAvatar firstName={user?.first_name} />
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-green-400 text-black hover:bg-green-500 hover:text-white"
      >
        <UserPlus size={16} />
      </Button>
    </div>
  );
};

export default ProjectUsers;
