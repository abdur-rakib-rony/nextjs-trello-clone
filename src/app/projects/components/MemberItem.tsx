import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import MemberAvatar from "./MemberAvatar";
import { IUser } from "@/models/User";

interface MemberItemProps {
  member: IUser;
  onRemove: () => void;
}

const MemberItem: FC<MemberItemProps> = ({ member, onRemove }) => (
  <div className="flex w-full items-center justify-between rounded-full bg-secondary pr-2">
    <div>
      <MemberAvatar name={`${member.first_name} ${member.last_name}`} />
      <span className="ml-2 mr-1 text-sm font-medium">{`${member.first_name} ${member.last_name}`}</span>
    </div>
    <Button
      variant="outline"
      size="icon"
      className="h-6 w-6 rounded-full hover:bg-red-100"
      onClick={onRemove}
    >
      <Trash
        size={14}
        className="text-gray-500 transition-colors hover:text-red-500"
      />
    </Button>
  </div>
);

export default MemberItem;
