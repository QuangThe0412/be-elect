import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ApiGetUsers, User } from '@/services/userApi';
import { ApiGetRoleDetails, ResponseRoleApi, Role } from '@/services/roleApi';
import { Permission } from '@/services/permissionApi';
import { ApiGetUserRoleByIdUser, UserRole } from '@/services/userRoleApi';
import { RolePermission } from '@/services/rolePermission';

export default function ManagerRolePermission() {
    const [filters, setFilters] = useState<DataTableFilterMeta>();
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [users, setUsers] = useState<User[]>();
    const [roles, setRoles] = useState<Role[]>();
    const [permissions, setPermissions] = useState<Permission[]>();
    
    const [rolePermissions, setRolePermissions] = useState<RolePermission[]>();

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

    

    const bodyPermissionRoleTemplate = (rowData: User) => {
        return <>
            <span>{rowData.username}</span>
        </>;
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} loading={loading}
                header={header} emptyMessage="No user found.">
                <Column field="user" header="User" style={{ minWidth: '12rem' }} body={bodyUserTemplate} />
                <Column field="userRole" header="UserRole" style={{ minWidth: '12rem' }} body={BodyUserRoleTemplate} />
                <Column field="permissionRole" header="PermissionRole" style={{ minWidth: '12rem' }} body={bodyPermissionRoleTemplate} />
            </DataTable>
        </div>
    );
}
const BodyUserRoleTemplate = (rowData: User) => {
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const [role, setRole] = useState<Role>()
    const id : string = rowData.id;
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
            {userRoles.map(roles => <RoleDetail roleId={roles.roleId}/>)}
        </>
    )
};
type PropRoleDetail = {
    roleId?: string
}
const RoleDetail = ({roleId}: PropRoleDetail) => {
    const [role, setRole] = useState<Role>()

    const fetchRoleById = async (roleId:string) => {
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
        padding:'2px 4px',
        border: '1px solid purple',
        background: '#ff0'
    }}>{role?.name}</span>
}
