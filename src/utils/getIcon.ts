export default function getIcon(
  name: string,
  fileExtension?: "svg" | "png" | "gif"
) {
  return `/icons/${name}.${fileExtension || "svg"}`;
}
