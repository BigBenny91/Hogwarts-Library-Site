// Walkhub
// Copyright (C) 2016 Pronovix
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
import Runner from "walkthrough/runner";
import WalkhubIframe from "components/walkhub_iframe";
import {t} from "t";
import $ from "jquery";

class IframeRunner extends Runner {
	reloadHTTP = true;

	getWidget(title) {
		return (
			<WalkhubIframe
				src="/assets/start.html"
				recdot={this.recording}
				onClose={this.onClose}
				actionButton={this.recording ? t("Finish & Save") : null}
				actionButtonClassName="btn-finishsave"
				onActionButtonClick={this.actionClick}
				title={title}
			/>
		);
	}

	getName() {
		return "iframe";
	}

	screenshotCrop() {
		const elem = $("iframe#walkhub-iframe");
		if (elem.length === 1) {
			return Object.assign({
				width: elem.width(),
				height: elem.height(),
				ratio: (window.devicePixelRatio || 1),
			}, elem.offset());
		}

		return false;
	}
}

export default IframeRunner;
