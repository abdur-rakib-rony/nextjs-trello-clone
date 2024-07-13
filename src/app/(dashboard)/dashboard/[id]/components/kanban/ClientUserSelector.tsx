"use client";
import { useState, useEffect, FC } from "react";
import { getAllUsers } from "@/app/actions/userActions";
import { IUser } from "@/models/User";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientUserSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ClientUserSelector: FC<ClientUserSelectorProps> = ({
  value,
  onChange,
}) => {
  const [users, setUsers] = useState<Omit<IUser, "password">[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem
            key={user._id.toString()}
            value={`${user.first_name} ${user.last_name}`}
          >
            {`${user.first_name} ${user.last_name}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClientUserSelector;
