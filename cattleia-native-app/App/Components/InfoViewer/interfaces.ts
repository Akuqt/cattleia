export interface InfoProps {
  mb: string;
  info: string[];
  handler?: () => void;
  back?: {
    show: boolean;
    handler?: () => void;
  };
  last?: boolean;
}
