import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/models/User";

interface MemberSelectProps {
  users: IUser[];
  selectedMember: string;
  onSelectMember: (value: string) => void;
}

const MemberSelect: FC<MemberSelectProps> = ({
  users,
  selectedMember,
  onSelectMember,
}) => (
  <Select onValueChange={onSelectMember} value={selectedMember}>
    <SelectTrigger>
      <SelectValue placeholder="Select a member to add" />
    </SelectTrigger>
    <SelectContent>
      {users.map((user) => (
        <SelectItem key={user._id.toString()} value={user._id.toString()}>
          {`${user.first_name} ${user.last_name}`}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default MemberSelect;
