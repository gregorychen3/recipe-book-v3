import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionTypes, hideAdminLoginModal } from "../redux/actions";
import { RootState } from "../redux/reducers";
import {
  adminLoginModalVisibility,
  adminLoginCallback
} from "../redux/selectors";

interface Props {
  onHide: () => void;
  adminLoginCallback: ((password: string) => void) | undefined;
}
const AdminLoginModal = ({ onHide, adminLoginCallback }: Props) => {
  const [password, setPassword] = useState("");

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => onHide()}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Admin Login</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => onHide()}
          ></button>
        </header>
        <section className="modal-card-body">
          <input
            type="password"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            placeholder="Password"
            className="input"
          />
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => onHide()}>
            Cancel
          </button>
          <button
            onClick={() => {
              adminLoginCallback && adminLoginCallback(password);
              onHide();
            }}
            className="button is-success"
          >
            Submit
          </button>
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  adminLoginModalVisibility: adminLoginModalVisibility(state),
  adminLoginCallback: adminLoginCallback(state)
});
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ hideAdminLoginModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLoginModal);
