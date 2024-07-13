export function getFirstCharacter(name: string | undefined) {
  if (name && typeof name === "string") {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
    return initials.join("");
  }
  return "n/a";
}
