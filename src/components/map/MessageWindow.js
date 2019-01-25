import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class MessageWindow extends PureComponent {
  render() {
    const { info } = this.props;
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {info.message}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MessageWindow);
