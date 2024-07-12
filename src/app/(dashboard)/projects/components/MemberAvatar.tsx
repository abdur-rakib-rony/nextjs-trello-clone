import { Button } from "@/components/ui/button";
import { getFirstCharacter } from "@/utils/getFirstCharacter";

interface MemberAvatarProps {
  firstName: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ firstName }) => (
  <Button variant="outline" size="icon" className="rounded-full">
    {getFirstCharacter(firstName)}
  </Button>
);

export default MemberAvatar;
