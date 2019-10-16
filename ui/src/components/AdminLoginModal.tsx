import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionTypes, hideAdminLoginModal } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { adminLoginModalVisibility } from "../redux/selectors";

const AdminLoginModal = () => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">Admin login </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  adminLoginModalVisibility: adminLoginModalVisibility(state)
});
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ hideAdminLoginModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLoginModal);
