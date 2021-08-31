export interface ISubmit {
  label: string;
  handler: () => void;
  width?: string;
  colors: any;
  lm?: boolean;
  sec?: boolean;
  alignLabel?: 'start' | 'center' | 'end';
}
