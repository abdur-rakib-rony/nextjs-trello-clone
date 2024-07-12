import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MemberAvatar from "./MemberAvatar";
import { IUser } from "@/models/User";

interface MemberItemProps {
  member: IUser;
  onRemove: () => void;
}

const MemberItem: React.FC<MemberItemProps> = ({ member, onRemove }) => (
  <div className="flex w-full items-center justify-between rounded-full bg-secondary pr-2">
    <div>
      <MemberAvatar firstName={member.first_name} />
      <span className="ml-2 mr-1 text-sm font-medium">{`${member.first_name} ${member.last_name}`}</span>
    </div>
    <Button
      variant="outline"
      size="icon"
      className="h-6 w-6 rounded-full p-0"
      onClick={onRemove}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);

export default MemberItem;
