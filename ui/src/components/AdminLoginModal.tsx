import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionTypes, hideAdminLoginModal } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { adminLoginModalVisibility } from "../redux/selectors";

interface Props {
  onHide: () => void;
}
const AdminLoginModal = ({ onHide }: Props) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => onHide()}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Administrator Login</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => onHide()}
          ></button>
        </header>
        <section className="modal-card-body">
          <input className="input" type="password" placeholder="Password" />
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => onHide()}>
            Cancel
          </button>
          <button className="button is-success">Submit</button>
        </footer>
      </div>
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
