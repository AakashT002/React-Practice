import React from 'react';
import PropTypes from 'prop-types';
import { CardText, TextField, Button, Paper } from 'react-md';
import '../assets/stylesheets/Roles.css';

const Roles = ({ role}) => {
	return (
		<Paper className="Roles_rectangle">
			<div className="Roles__form" id="Roles_div">
				<CardText>
					<TextField disabled id={role} value={role} />
				</CardText>
				<Button
					className="Roles__button--save"
					disabled
					flat
					primary
					>
					SAVE
        </Button>
				<div className="Roles__button--remove">
					<Button
						flat
						primary
						>
						REMOVE
          </Button>
				</div>
			</div>
		</Paper>
	);
};

Roles.propTypes = {
	role: PropTypes.string,
};

export default Roles;
