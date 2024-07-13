import { Button } from "@/components/ui/button";
import { getFirstCharacter } from "@/utils/getFirstCharacter";

interface MemberAvatarProps {
  name: string | undefined;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ name }) => {
  return (
    <Button variant="outline" size="icon" className="rounded-full border-blue-200">
      {getFirstCharacter(name)}
    </Button>
  );
};

export default MemberAvatar;
