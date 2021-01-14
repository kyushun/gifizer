type Props = {
  icon: string;
  size: number;
};

export const Icon = (props: Props) => (
  <figure
    css={`
      margin: 0;
      width: ${props.size}px;
      height: ${props.size}px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url(${props.icon});
      //background-size: ${props.size}px ${props.size}px;
      background-size: contain;
    `}
  />
);
