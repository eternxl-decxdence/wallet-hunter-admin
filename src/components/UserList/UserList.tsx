import { User } from "../../interfaces/User";
import "./UserList.scss";
import ControlButtons from "../ControlButtons/ControlButtons";

export default function UserList({
  users,
  openCreateDialog,
  openUpdateDialog,
  openDeleteDialog
}: {
  users: User[];
  openCreateDialog: (arg: "user" | "admin") => void;
  openDeleteDialog: (arg: string, arg2: "user" | "admin") => void;
  openUpdateDialog: (arg: string, arg2: "user" | "admin") => void;
}) {
  return (
    <div className='user-list-container'>
      <div className='label'>
        <span className='text'>Пользователи</span>
      </div>
      <button className='create' onClick={() => openCreateDialog("user")}>
        <span className='text'>Добавить</span>
      </button>

      <div className='users-wrapper'>
        <div className='users-header'>
          <span className='username'>Имя пользователя</span>
          <hr className='table-separator' />
          <span className='servers-count'>Количество серверов</span>
          <hr className='table-separator' />
          <span className='found-count'>Найдено адресов</span>
          <hr className='table-separator' />
          <span className='subscription'>Статус подписки</span>
          <hr className='table-separator' />
        </div>
        {users.map((user, index) => {
          return (
            <div key={index} className='user-row'>
              <span className='username'>{user.username}</span>
              <hr className='table-separator' />
              <span className='servers-count'>{user.serverCount}</span>
              <hr className='table-separator' />
              <span className='found-count'>{user.foundCount}</span>
              <hr className='table-separator' />
              <span className='subscription'>
                {(() => {
                  const subscriptionExpirationDate = new Date(
                    user.subscription
                  );
                  const now = new Date();
                  const diffMs =
                    subscriptionExpirationDate.getTime() - now.getTime();

                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

                  if (diffHours < 0) return `ИСТЁК`;

                  if (diffDays === 0) return `${diffHours}ч`;

                  if (diffDays > 0) return `${diffDays}д`;
                })()}
              </span>
              <hr className='table-separator' />
              <ControlButtons
                scope='user'
                username={user.username}
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
