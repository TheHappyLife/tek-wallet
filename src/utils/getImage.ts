export default function getImage(name: string, fileType: string = "png") {
  return `/images/${name}.${fileType}`;
}
