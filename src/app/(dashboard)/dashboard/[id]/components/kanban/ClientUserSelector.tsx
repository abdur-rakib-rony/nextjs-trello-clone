"use client";
import { useState, useEffect } from "react";
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

export function ClientUserSelector({
  value,
  onChange,
}: ClientUserSelectorProps) {
  const [users, setUsers] = useState<Omit<IUser, "password">[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user._id.toString()} value={`${user.first_name} ${user.last_name}`}>
            {`${user.first_name} ${user.last_name}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}