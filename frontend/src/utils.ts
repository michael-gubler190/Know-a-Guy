import { indigo, teal, deepPurple, pink, orange, green, blue, red } from "@mui/material/colors";

const HEADER_COLORS: string[] = [
  indigo[600],
  teal[700],
  deepPurple[500],
  pink[600],
  orange[800],
  green[700],
  blue[700],
  red[600],
];

export function colorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return HEADER_COLORS[hash % HEADER_COLORS.length];
}