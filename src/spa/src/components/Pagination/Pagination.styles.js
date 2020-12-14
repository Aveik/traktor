import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    margin: `${theme.spacing(1)}px 0`,
    padding: `0 ${theme.spacing(1)}px`,
    textAlign: 'right',
  },
}));
