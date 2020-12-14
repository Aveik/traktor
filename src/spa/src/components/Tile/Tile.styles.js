import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  body: {
    bottom: 30,
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 30px)',
    justifyContent: 'flex-end',
    padding: `0 ${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
    position: 'absolute',
    width: '100%',
  },
  chips: {
    '& > *': {
      margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
    },
  },
  footer: {
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    backgroundColor: theme.palette.grey[900],
    height: 30,
    padding: 2,
    width: '100%',
  },
  root: ({ backgroundImage }) => ({
    background: `url(${backgroundImage}) no-repeat center`,
    backgroundSize: 'cover',
    borderBottom: `1px solid #2d2d2d`,
    borderRight: `1px solid #2d2d2d`,
    color: theme.palette.primary.contrastText,
    paddingTop: `calc(1px + 125%)`,
    position: 'relative',
    width: '100%',
  }),
}));
