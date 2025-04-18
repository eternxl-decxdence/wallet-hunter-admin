import "./MainPage.scss";
import Logo from "../../assets/ethereum.svg?react";
import UpdateDialog from "../../components/UpdateDialog/UpdateDialog";
import { useState, useRef, useEffect } from "react";
import api from "../../api";
import UserList from "../../components/UserList/UserList";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { User } from "../../interfaces/User";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import { Admin } from "../../interfaces/Admin";
import CreateDialog from "../../components/CreateDialog/CreateDialog";
import AdminList from "../../components/AdminList/AdminList";

export default function MainPage() {
  const [isUpdateDialog, setUpdateDialog] = useState<boolean>(false);
  const [isDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [isCreateDialog, setCreateDialog] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedScope, setSelectedScope] = useState<"user" | "admin" | null>();

  function handleUpdateDialogOpen(username: string, scope: "user" | "admin") {
    setSelectedUser(username);
    setSelectedScope(scope);
    setUpdateDialog(true);
  }
  function handleDeleteDialogOpen(username: string, scope: "user" | "admin") {
    setSelectedUser(username);
    setSelectedScope(scope);
    setDeleteDialog(true);
  }
  function handleUpdateDialogClose() {
    setSelectedUser("");
    setSelectedScope(null);
    setUpdateDialog(false);
  }
  function handleDeleteDialogClose() {
    setSelectedUser("");
    setSelectedScope(null);
    setUpdateDialog(false);
    setDeleteDialog(false);
  }
  function handleCreateDialogOpen(scope: "user" | "admin") {
    setCreateDialog(true);
    setSelectedScope(scope);
  }
  function handleCreateDialogClose() {
    setSelectedScope(null);
    setCreateDialog(false);
  }
  const [users, setUsers] = useState<User[]>();
  const [admin, setAdmin] = useState<Admin>();
  const [adminList, setAdminList] = useState<Admin[]>();

  const REFRESH_DELAY = 3600000;
  const userIntervalRef = useRef<number | null>(null);
  const adminIntervalRef = useRef<number | null>(null);
  const adminListIntervalRef = useRef<number | null>(null);

  async function refreshUserData() {
    const userData = await api.get<User[]>("/admin/user/list");
    setUsers(userData.data);
  }

  async function refreshAdminData() {
    const userData = await api.get<Admin>("/admin/getUser");
    setAdmin(userData.data);
  }
  async function refreshAdminList() {
    if (admin?.role === "admin") return;
    const userData = await api.get<Admin[]>("/admin/list");
    setAdminList(userData.data);
  }
  useEffect(() => {
    refreshUserData();
    userIntervalRef.current = setInterval(refreshUserData, REFRESH_DELAY);

    return () => {
      if (userIntervalRef.current) clearInterval(userIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    refreshAdminData();
    adminIntervalRef.current = setInterval(refreshAdminData, REFRESH_DELAY);

    return () => {
      if (adminIntervalRef.current) clearInterval(adminIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (admin?.role === "admin") return;
    refreshAdminList();
    adminListIntervalRef.current = setInterval(refreshAdminList, REFRESH_DELAY);

    return () => {
      if (adminListIntervalRef.current)
        clearInterval(adminListIntervalRef.current);
    };
  }, [admin]);

  return Array.isArray(users) && admin ? (
    <div className='main-page'>
      <div className='header'>
        <Logo className='logo' />
        <div className='header-text'>
          <span className='default-text'>
            Добро пожаловать,{" "}
            <span className='username-text'>{admin!.username}</span>{" "}
            {admin!.role === "superadmin" ? (
              <span className='mode-text'> / Super Admin Mode</span>
            ) : null}
          </span>
        </div>
      </div>
      <div className='data-container'>
        <UserList
          users={users!}
          openCreateDialog={handleCreateDialogOpen}
          openUpdateDialog={handleUpdateDialogOpen}
          openDeleteDialog={handleDeleteDialogOpen}
        />
        {admin.role === "superadmin" && Array.isArray(adminList) ? (
          <AdminList
            admins={adminList!}
            openCreateDialog={handleCreateDialogOpen}
            openUpdateDialog={handleUpdateDialogOpen}
            openDeleteDialog={handleDeleteDialogOpen}
          />
        ) : null}
      </div>
      {isUpdateDialog ? (
        <UpdateDialog
          refreshList={
            selectedScope === "user" ? refreshUserData : refreshAdminList
          }
          username={selectedUser}
          scope={selectedScope!}
          closeDialog={handleUpdateDialogClose}
        />
      ) : null}
      {isDeleteDialog ? (
        <DeleteDialog
          refreshList={
            selectedScope === "user" ? refreshUserData : refreshAdminList
          }
          username={selectedUser}
          scope={selectedScope!}
          closeDialog={handleDeleteDialogClose}
        />
      ) : null}
      {isCreateDialog ? (
        <CreateDialog
          scope={selectedScope!}
          refreshList={
            selectedScope === "user" ? refreshUserData : refreshAdminList
          }
          closeDialog={handleCreateDialogClose}
        />
      ) : null}
    </div>
  ) : (
    <div className='loading'>
      <LoadingSpinner />
    </div>
  );
}
