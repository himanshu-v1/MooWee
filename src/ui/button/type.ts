export default interface IButton {
  text?: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'rounded';
  isSmall?: boolean;
  isTransition?: boolean;
  children?: React.ReactNode;
}