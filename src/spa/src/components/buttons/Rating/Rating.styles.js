import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  buttonRoot: {
    minWidth: 154,
  },
  popoverPaper: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(0.25),
  },
  ratingRoot: {
    color: theme.palette.secondary.main,
  },
}));
