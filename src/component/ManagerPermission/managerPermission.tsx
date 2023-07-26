import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ApiGetUsers, ApiUpdateStatusUser, User } from '@/services/userApi';
import { ApiGetRoleDetails, ApiGetRoles, ResponseRoleApi, Role } from '@/services/roleApi';
import { Permission } from '@/services/permissionApi';
import { ApiGetUserRoleByIdUser, UserRole } from '@/services/userRoleApi';
import { RolePermission } from '@/services/rolePermission';
import { Toast } from 'primereact/toast';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { SelectItem, SelectItemOptionsType } from 'primereact/selectitem';

export default function ManagerRolePermission() {
    const [filters, setFilters] = useState<DataTableFilterMeta>();
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [users, setUsers] = useState<User[]>();
    const [renderApi, setRenderApi] = useState<boolean>(false);
    const [roles, setRoles] = useState<Role[]>();
    const [permissions, setPermissions] = useState<Permission[]>();

    const [rolePermissions, setRolePermissions] = useState<RolePermission[]>();
    const toast = useRef<Toast>(null);

    const show = () => {
        toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };

    useEffect(() => {
        const fetchDataUser = async () => {
            const userRes = await ApiGetUsers();
            if (userRes && userRes.code === 200) {
                setUsers(userRes.data);
                setLoading(false);
            }
        }

        fetchDataUser();
    }, [renderApi]);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const bodyUserTemplate = (rowData: User) => {
        return <>
            <span>{rowData.username}</span>
        </>;
    };

    const bodyActionTemplate = (rowData: User) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ cursor: "pointer", padding: "10px" }} onClick={() => HandleClickAddRole(rowData)}>
                    <i className="pi pi-plus" style={{ fontSize: '1.5rem' }}></i>
                </div>
            </div>
        );
    };

    const HandleClickAddRole = async (rowData: User) => {
        const userId = rowData.id;
        if (userId) {
            console.log(userId)
        }
    };

    const BodyStatusTemplate = (rowData: User) => {
        const isActive = rowData.isActive;
        const idUser = rowData.id;

        const UpdateStatusUser = async () => {
            const res = await ApiUpdateStatusUser(idUser, isActive);
            if (res && res.code === 200) {
                setRenderApi(!renderApi);
            }
        }
        return (
            <>
                <InputSwitch checked={isActive} onChange={UpdateStatusUser} />
            </>
        )
    };

    const header = renderHeader();

    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} loading={loading}
                    header={header} emptyMessage="No user found.">
                    <Column field="user" header="User" style={{ minWidth: '12rem' }} body={bodyUserTemplate} />
                    <Column field="isDeleted" header="Status" style={{ minWidth: '12rem' }} body={BodyStatusTemplate} />
                    <Column field="role" header="Role" style={{ minWidth: '12rem' }} body={BodyUserRoleTemplate} />
                    {/* <Column field="addRole" header="AddRole" style={{ minWidth: '12rem' }} body={bodyActionTemplate} /> */}
                </DataTable>
            </div>
        </>
    );
}

interface RoleABC {
    name: string;
    id: string;
}

const BodyUserRoleTemplate = (rowData: User) => {
    const idUser: string = rowData.id;
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const [selectRoles, setSelectRoles] = useState<Role[]>([]);
  
    const fetchDataRole = async () => {
      const roleRes = await ApiGetRoles();
      if (roleRes && roleRes.code === 200) {
        setSelectRoles(roleRes.data);
      }
    };
  
    useEffect(() => {
      fetchDataRole();
    }, []);
  
    const fetchDataUserRole = async () => {
      const userRoleRes = await ApiGetUserRoleByIdUser(idUser);
      if (userRoleRes && userRoleRes.code === 200) {
        console.log(userRoleRes)
        setUserRoles(userRoleRes.data);
      }
    };
  
    useEffect(() => {
      fetchDataUserRole();
    }, [idUser]);
  
    return (
      <>
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectRoles}
            onChange={(e: MultiSelectChangeEvent) => setSelectRoles(e.value)}
            options={userRoles}
            optionLabel="name"
            placeholder="Select Role"
            maxSelectedLabels={9}
            className="w-full md:w-20rem"
          />
        </div>
      </>
    );
  };