import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ApiDeletedUser, ApiGetUsers, User } from '@/services/userApi';
import { ApiGetRoleDetails, ResponseRoleApi, Role } from '@/services/roleApi';
import { Permission } from '@/services/permissionApi';
import { ApiGetUserRoleByIdUser, UserRole } from '@/services/userRoleApi';
import { RolePermission } from '@/services/rolePermission';
import { Toast } from 'primereact/toast';

export default function ManagerRolePermission() {
    const [filters, setFilters] = useState<DataTableFilterMeta>();
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [users, setUsers] = useState<User[]>();
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
    }, []);

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
                <div style={{ cursor: "pointer", padding: "10px" }} onClick={() => HandleClickEdit(rowData)}>
                    <i className="pi pi-pencil" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <div style={{ cursor: "pointer" }} onClick={() => HandleClickRemove(rowData)}>
                    <i className="pi pi-trash" style={{ fontSize: '1.5rem' }}></i>
                </div>
            </div>
        );
    };

    const HandleClickEdit = async (user: User) => {
        const userId = user.id;
        if (userId) {
            console.log(userId)
        }
    };

    const HandleClickRemove = async (user: User) => {
        const userId = user.id;
        if (userId) {
            const resRemoveUser = await ApiDeletedUser(userId);
            if(resRemoveUser && resRemoveUser.code === 200){
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User has been disabled', life: 3000 });
            } else{
                toast.current?.show({ severity: 'success', summary: 'Faild', detail: 'Erro action disabled user', life: 8000 });
            }
        }
    };

    const header = renderHeader();

    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} loading={loading}
                    header={header} emptyMessage="No user found.">
                    <Column field="user" header="User" style={{ minWidth: '12rem' }} body={bodyUserTemplate} />
                    <Column field="role" header="Role" style={{ minWidth: '12rem' }} body={BodyUserRoleTemplate} />
                    <Column field="action" header="Action" style={{ minWidth: '12rem' }} body={bodyActionTemplate} />
                    <Column field="isDeleted" header="Status" style={{ minWidth: '12rem' }} body={BodyStatusTemplate} />
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

const BodyStatusTemplate = (rowData: User) => {
    const [active, setActive] = useState<boolean>(false);
    const id: string = rowData.id;
    const fetchDataUserRole = async () => {
        // const userRoleRes = await ApiGetUserRoleByIdUser(rowData.id);
        // if (userRoleRes && userRoleRes.code === 200) {
        //     setUserRoles(userRoleRes.data);
        // }
    }
    useEffect(() => {
        fetchDataUserRole()
    }, [id]);

    return (
        <>
            
        </>
    )
};