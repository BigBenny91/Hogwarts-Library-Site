// Walkhub
// Copyright (C) 2015 Pronovix
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import {noop} from "form";
import {t} from "t";

import helpIcon from "images/light-bulb.svg";

class HelpButton extends React.Component {

	static defaultProps = {
		helpClick: noop,
	};

	render() {
		return (
			<div className="info helpbutton-container text-center">
				<button type="button" className="btn btn-default btn-warning btn-md help-button" onClick={this.props.helpClick}>
					<strong className="semi-bold">{t("Get help")}</strong> <span><object className="help-icon" type="image/svg+xml" data={helpIcon}></object></span>
				</button>
			</div>
		);
	}

}

export default HelpButton;
