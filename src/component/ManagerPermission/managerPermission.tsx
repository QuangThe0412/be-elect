import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ApiGetUsers, ApiUpdateStatusUser, User } from '@/services/userApi';
import { ApiGetRoleDetails, ResponseRoleApi, Role } from '@/services/roleApi';
import { Permission } from '@/services/permissionApi';
import { ApiGetUserRoleByIdUser, UserRole } from '@/services/userRoleApi';
import { RolePermission } from '@/services/rolePermission';
import { Toast } from 'primereact/toast';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

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
                    <Column field="addRole" header="AddRole" style={{ minWidth: '12rem' }} body={bodyActionTemplate} />
                </DataTable>
            </div>
        </>
    );
}

const BodyUserRoleTemplate = (rowData: User) => {
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const id: string = rowData.id;
    const fetchDataUserRole = async () => {
        const userRoleRes = await ApiGetUserRoleByIdUser(rowData.id);
        if (userRoleRes && userRoleRes.code === 200) {
            setUserRoles(userRoleRes.data);
        }
    }
    useEffect(() => {
        fetchDataUserRole()
    }, [id]);

    return (
        <>
            {userRoles.map(roles => <RoleDetail key={roles.roleId} roleId={roles.roleId} />)}
        </>
    )
};

type PropRoleDetail = {
    roleId?: string
}

const RoleDetail = ({ roleId }: PropRoleDetail) => {
    const [role, setRole] = useState<Role>()

    const fetchRoleById = async (roleId: string) => {
        const response = await ApiGetRoleDetails(roleId)
        if (response && response.code === 200) {
            setRole(response.data)
        }
    }
    useEffect(() => {
        if (roleId) {
            fetchRoleById(roleId)
        }

    }, [roleId]);

    return <span style={{
        padding: '2px 4px',
        border: '1px solid purple',
        background: '#ff0'
    }}>{role?.name}</span>
}