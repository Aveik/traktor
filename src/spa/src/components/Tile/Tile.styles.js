import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  children: {
    textAlign: 'center',
  },
  content: {
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    position: 'absolute',
  },
  footer: {
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    backgroundColor: theme.palette.grey[900],
    height: 30,
    padding: 2,
  },
  link: ({ backgroundImage }) => ({
    background: `url(${backgroundImage}) no-repeat center`,
    'background-size': 'cover',
    color: theme.palette.primary.contrastText,
    display: 'block',
    paddingTop: '125%',
    position: 'relative',
    width: '100%',
  }),
  root: {},
}));
