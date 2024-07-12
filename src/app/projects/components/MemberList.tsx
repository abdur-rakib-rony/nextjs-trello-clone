import MemberItem from "./MemberItem";
import { IUser } from "@/models/User";

interface MemberListProps {
  members: IUser[];
  onRemoveMember: (memberId: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, onRemoveMember }) => (
  <div className="flex flex-wrap gap-2">
    {members.map((member) => (
      <MemberItem
        key={member._id.toString()}
        member={member}
        onRemove={() => onRemoveMember(member._id.toString())}
      />
    ))}
  </div>
);

export default MemberList;
