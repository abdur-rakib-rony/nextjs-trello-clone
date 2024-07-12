export function getFirstCharacter(name: string) {
  if (name && typeof name === "string") {
    return name.charAt(0);
  }
  return "";
}
