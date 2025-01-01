import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactComponent as TrelloSvg } from '~svg/trello.svg';

function TrelloIcon(props: SvgIconProps) {
    return <SvgIcon component={TrelloSvg} inheritViewBox {...props} />;
}

export default TrelloIcon;
