import React from 'react';

export default class Modal extends React.Component {
	render() {
		return (
			<div className="modal fade" role="dialog" id={this.props.modalId}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title">{this.props.title}</h4>
			      </div>
			      <div className="modal-body">
			      	{this.props.children}
			      </div>
			    </div>
			  </div>
			</div>
		);
	}	
}