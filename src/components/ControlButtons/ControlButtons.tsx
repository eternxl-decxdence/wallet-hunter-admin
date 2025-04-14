import "./ControlButtons.scss";

export default function ControlButtons({
  username,
  scope,
  openDeleteDialog,
  openUpdateDialog
}: {
  openDeleteDialog: (arg: string, arg2: "user" | "admin") => void;
  openUpdateDialog: (arg: string, arg2: "user" | "admin") => void;
  username: string;
  scope: "user" | "admin";
}) {
  return (
    <div className='control-buttons'>
      <button
        className='control update'
        onClick={() => openUpdateDialog(username, scope)}
      >
        Изменить
      </button>
      <button
        className='control delete'
        onClick={() => openDeleteDialog(username, scope)}
      >
        Удалить
      </button>
    </div>
  );
}
