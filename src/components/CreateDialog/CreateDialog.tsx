import "./CreateDialog.scss";
import { useState, FormEvent } from "react";
import api from "../../api";
export default function CreateDialog({
  scope,
  refreshList,
  closeDialog
}: {
  refreshList: () => void;
  closeDialog: () => void;
  scope: "user" | "admin";
}) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    try {
      scope === "user"
        ? await api.post("/user/register", { username, password })
        : null;
      scope === "admin"
        ? await api.post("/admin/create", { username, password })
        : null;

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
      <div className='create-dialog-container'>
        <div className='label'>
          <span className='text'>Создать</span>
        </div>
        <form onSubmit={handleUpdate} className='create-form'>
          <input
            type='text'
            className='create-form-input'
            placeholder='Имя пользователя'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type='text'
            className='create-form-input'
            placeholder='Пароль...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='create-form-button' type='submit'>
            Изменить
          </button>
        </form>
      </div>
    </div>
  );
}
