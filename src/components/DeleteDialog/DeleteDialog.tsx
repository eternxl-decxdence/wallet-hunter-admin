import "./DeleteDialog.scss";
import api from "../../api";

export default function DeleteDialog({
  username,
  scope,
  refreshList,
  closeDialog
}: {
  username: string;
  scope: "user" | "admin";
  refreshList: () => void;
  closeDialog: () => void;
}) {
  async function handleDelete() {
    try {
      scope === "user" &&
        (await api.post("/admin/user/delete", {
          username
        }));
      scope === "admin" && (await api.post("/admin/delete", { username }));
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
      <div className='delete-dialog-container'>
        <div className='label'>
          <span className='text'>Удаление</span>
        </div>
        <div className='data-wrapper'>
          <p className='warning-text'>
            Вы уверены что хотите удалить пользователя{" "}
            <strong>{username}</strong>? <br /> <br />
            Будут удалены все его найденные адреса и сервера, это действие
            нельзя отменить.
          </p>
          <button className='delete-button' onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
