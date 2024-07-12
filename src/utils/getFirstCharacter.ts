export function getFirstCharacter(name: string | undefined) {
  if (name && typeof name === "string") {
    return name.charAt(0);
  }
  return "";
}
