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
import Step from "components/step";
import EmbedCode from "components/embedcode";
import {noop} from "form";
import {t} from "t";
import {Link} from "react-router";
import {parseGoDate} from "util";

class Walkthrough extends React.Component {

	static defaultProps = {
		walkthrough: {},
		onPlayClick: noop,
		onScreeningClick: noop,
		onEditClick: noop,
		onDeleteClick: noop,
		editable: false,
		embedded: false,
		compact: false,
		linkTo: true,
		httpReload: false,
		iframeBlocked: false,
		helpcenter: false,
	};

	static contextTypes = {
		location: React.PropTypes.shape,
		history: React.PropTypes.shape,
	};

	render() {
		const walkthrough = this.props.walkthrough;

		const playButton = this.props.helpcenter ? <a href="#" onClick={this.props.onPlayClick}><span className="glyphicon glyphicon-play-circle list-play-button" aria-hidden="true" data-toggle="tooltip" title={t("Play walkthrough")}></span></a> :
			<a onClick={this.props.onPlayClick} className="btn btn-success btn-sm">{t("Play")}</a>;

		if (this.props.embedded) {
			return playButton;
		}

		let counter = 0;
		const steps = walkthrough.steps ? walkthrough.steps.map((step) => {
			return <Step key={counter++} step={step} />;
		}) : null;

		const editbuttons = [];
		if (this.props.editable) {
			if (this.props.compact) {
				const href = this.context.history.createHref(`/walkthrough/${walkthrough.uuid}`);
				editbuttons.push(<a href={href} key="edit" target="_blank" className="btn btn-default btn-sm">{t("Edit")}</a>);
				editbuttons.push(<a href={href} key="delete" className="btn btn-danger btn-sm">{t("Delete")}</a>);
			} else {
				editbuttons.push(<a onClick={this.props.onEditClick} key="edit" className="btn btn-default btn-sm">{t("Edit")}</a>);
				editbuttons.push(<a onClick={this.props.onDeleteClick} key="delete" className="btn btn-danger btn-sm">{t("Delete")}</a>);
			}
		}

		const titleName = this.props.compact && this.props.linkTo ?
			<Link to={`/walkthrough/${walkthrough.uuid}`}>{walkthrough.name}</Link> :
			walkthrough.name;

		const date = walkthrough.updated ? parseGoDate(walkthrough.updated) : {};

		const title = this.props.helpcenter ? (
			<div className="row row-wt-helpcenter">
				<div className="col-xs-1">
					{playButton}
				</div>
				<div className="col-xs-11">
					<h5 className="wt-title">
						<a href="#" onClick={this.props.onPlayClick}>{titleName}</a>
					</h5>
				</div>
			</div>
		) : (
			<div className="row row-wt-no-helpcenter">
				<div className="col-xs-7 col-sm-8">
					<h5 className="wt-title">
						{`${date.year}-${date.month}-${date.day}`} - {titleName}
					</h5>
				</div>
				<div className="col-xs-5 col-sm-4 wt-buttons">
					{playButton}
					{editbuttons}
				</div>
			</div>
		);

		const description = (
			<div className="row">
				<div className="col-xs-12">
					<p> {walkthrough.description} </p>
				</div>
			</div>
		);

		const stepsWidget = (
			<div className="row">
				<div className="col-xs-12">
					<h3> {t("Steps")} </h3>
					{steps}
				</div>
			</div>
		);

		const screeninglink = "<img src=\""+WALKHUB_URL+"api/walkthrough/"+walkthrough.uuid+"/screening"+"\" />";

		const screeningWidget = `<iframe width="990" height="540" src="`+WALKHUB_URL+`walkthrough/${walkthrough.uuid}?embedded=1&screening_only=1&autoadvance=2000"></iframe>`;

		const embed = (
			<div className="row">
				<div className="col-xs-4">
					<h3> {t("Embed codes")} </h3>
				</div>
				<div className="col-xs-8">
					<p>{t("Walkthrough")}</p>
					<EmbedCode uuid={walkthrough.uuid} />
					<p>{t("Screening gif")}</p>
					<pre ref="embedbox" className="walkthrough-embedcode">{screeninglink}</pre>
					<p>{t("Screening widget")}</p>
					<pre ref="embedbox" className="walkthrough-embedcode">{screeningWidget}</pre>
				</div>
			</div>
		);

		const reloadHTTP = this.props.httpReload ? (
			<p className="bg-danger walkthrough-http-reload-message">{t("The walkthrough is recorded on an HTTP website. Playing the walkthrough will temporarly reload the page in HTTP.")}</p>
		) : null;

		const iframeBlocked = this.props.iframeBlocked ? (
			<p className="bg-danger walkthrough-iframe-blocked-message">{t("This walkthrough is only enabled in popup mode")}</p>
		) : null;

		return (
			<section key={walkthrough.revision} className={`walkthrough-uuid-${walkthrough.uuid} walkthrough-revision-${walkthrough.revision}`}>
				{title}
				{this.props.compact ? null : reloadHTTP}
				{this.props.compact ? null : iframeBlocked}
				{this.props.compact ? null : this.props.children}
				{this.props.compact ? null : description}
				{this.props.compact ? null : stepsWidget}
				{this.props.compact ? null : embed}
			</section>
		);
	}

}

export default Walkthrough;
