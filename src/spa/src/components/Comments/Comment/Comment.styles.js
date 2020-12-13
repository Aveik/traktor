import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  listItemRoot: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
});
