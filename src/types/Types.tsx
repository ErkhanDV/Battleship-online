export interface IProps {
  string: string;
}
export interface ICell {
  battlefield?: string[];
  setBattlefield?: React.Dispatch<React.SetStateAction<string[]>>;
  coordinate: number;
  coordinates?: { x: number; y: number };
  cell?: string;
  id?: string;
}
