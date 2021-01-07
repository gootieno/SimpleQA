import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { theme } from "../styles/theme";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

	title: {
		color: "white",
		marginLeft: "3em",
	},
	navContainer: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ background: theme.red }}>
				<Toolbar className={classes.navContainer}>
					<Button className={classes.title} href="/">
						<Typography
							variant="h5"
							component="h2"
							style={{ fontWeight: "bold", textTransform: 'none' }}
						>
							Simple QA
						</Typography>
					</Button>

					<Typography
						variant="h5"
						component="h2"
						style={{ fontWeight: "bold", marginRight: "3em" }}
					>
						2020-08-10-online
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
