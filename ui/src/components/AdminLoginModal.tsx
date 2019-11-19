import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionTypes, hideAdminLoginModal } from "../redux/actions";
import { getAdminLoginCallback } from "../redux/selectors";

interface Props {
  onHide: () => void;
}
const AdminLoginModal = ({ onHide }: Props) => {
  const [password, setPassword] = useState("");

  const adminLoginCallback = useSelector(getAdminLoginCallback);

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
        <footer className="modal-card-foot field is-grouped is-grouped-right">
          <button className="button" onClick={() => onHide()}>
            Cancel
          </button>

          <button
            onClick={() => {
              adminLoginCallback && adminLoginCallback(password);
              onHide();
            }}
            className="button is-primary"
          >
            Submit
          </button>
        </footer>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ hideAdminLoginModal }, dispatch);
export default connect(null, mapDispatchToProps)(AdminLoginModal);
