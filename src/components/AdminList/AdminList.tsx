import { Admin } from "../../interfaces/Admin";
import "./AdminList.scss";
import ControlButtons from "../ControlButtons/ControlButtons";

export default function AdminList({
  admins,
  openCreateDialog,
  openUpdateDialog,
  openDeleteDialog
}: {
  admins: Admin[];
  openCreateDialog: (arg: "user" | "admin") => void;
  openDeleteDialog: (arg: string, arg2: "user" | "admin") => void;
  openUpdateDialog: (arg: string, arg2: "user" | "admin") => void;
}) {
  return (
    <div className='admin-list-container'>
      <div className='label'>
        <span className='text'>Админстраторы</span>
      </div>
      <button className='create' onClick={() => openCreateDialog("admin")}>
        <span className='text'>Добавить</span>
      </button>

      <div className='users-wrapper'>
        <div className='users-header'>
          <span className='username'>Имя администратора</span>
          <hr className='table-separator' />
        </div>
        {admins.map((admin, index) => {
          return (
            <div key={index} className='user-row'>
              <span className='username'>{admin.username}</span>
              <hr className='table-separator' />
              <ControlButtons
                scope='admin'
                username={admin.username}
                openUpdateDialog={openUpdateDialog}
                openDeleteDialog={openDeleteDialog}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
