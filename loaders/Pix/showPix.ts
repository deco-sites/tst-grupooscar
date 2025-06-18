export interface Props {
  showPix: boolean;
  value: number;
}
interface PropsLoader {
  showPix: boolean;
  /**
 * @title Value percentage 
 */
  value: number;
}

const loader = ({ props }: { props: PropsLoader }): Props => props

export default loader