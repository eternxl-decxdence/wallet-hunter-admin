import "./UpdateDialog.scss";
import { useState, FormEvent } from "react";
import api from "../../api";
export default function UpdateDialog({
  username,
  scope,
  closeDialog,
  refreshList
}: {
  refreshList: () => void;
  closeDialog: () => void;
  username: string;
  scope: "user" | "admin";
}) {
  const [password, setPassword] = useState("");
  const [subDays, setSubDays] = useState("");

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    try {
      const subscriptionDays = subDays.length > 0 ? subDays : undefined;
      const newPassword = password !== "" ? password : undefined;
      scope === "user" &&
        (await api.post("/admin/user/update", {
          username,
          password: newPassword,
          subscriptionDays
        }));
      scope === "admin" &&
        (await api.post("/admin/update", { username, password }));
      refreshList();
      closeDialog();
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div
      className='dialog-overlay'
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDialog();
      }}
    >
      <div className='update-dialog-container'>
        <div className='label'>
          <span className='text'>{username}</span>
        </div>
        <form onSubmit={handleUpdate} className='update-form'>
          <input
            type='text'
            className='update-form-input'
            placeholder='Новый пароль пользователя...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {scope === "user" ? (
            <input
              type='number'
              className='update-form-input'
              placeholder='Добавить дни подписки'
              value={subDays}
              onChange={(e) => setSubDays(e.target.value)}
            />
          ) : null}
          <button className='update-form-button' type='submit'>
            Изменить
          </button>
        </form>
      </div>
    </div>
  );
}
