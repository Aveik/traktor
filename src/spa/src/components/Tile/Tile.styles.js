import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  footer: {
    bottom: 0,
    padding: 8,
    position: 'absolute',
  },
  image: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
  },
}));
