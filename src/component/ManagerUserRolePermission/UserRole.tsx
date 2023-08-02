import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ApiGetUsers, ApiUpdateStatusUser, User } from '@/services/userApi';
import { ApiGetRoles } from '@/services/roleApi';
import { AddOrUpdateUserRole, ApiGetUserRoleByIdUser, UserRole } from '@/services/userRoleApi';
import { Toast } from 'primereact/toast';
import { InputSwitch } from "primereact/inputswitch";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

interface RoleOptions {
    idRole: string;
    name: string;
}

export default function ManagerUserRole() {
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [roleOptions, setRoleOptions] = useState<RoleOptions[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        user: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        isActive: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [users, setUsers] = useState<User[]>();
    const toast = useRef<Toast>(null);

    const show = () => {
        toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };

    const fetchDataRole = async () => {
        const roleRes = await ApiGetRoles();
        if (roleRes && roleRes.code === 200) {
            const listRoles: RoleOptions[] = roleRes.data.map(item => ({
                idRole: item.id,
                name: item.name || ''
            }))
            setRoleOptions(listRoles);
        }
    };

    useEffect(() => {
        fetchDataRole();
    }, []);

    const fetchDataUser = async () => {
        setLoading(true)
        const userRes = await ApiGetUsers();
        if (userRes && userRes.code === 200) {
            setUsers(userRes.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading) fetchDataUser()
    }, [loading])

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

    const BodyUserTemplate = (rowData: User) => {
        return <>
            <span>{rowData.username}</span>
        </>;
    };

    const BodyStatusTemplate = (rowData: User) => {
        let isActive = rowData.isActive;
        const UpdateStatusUser = async (e:any) => {
            rowData.isActive = e.target.value;
            const res = await ApiUpdateStatusUser(rowData);
            if (res && res.code === 200) {
                setLoading(prev => !prev);
            }
        }
        return (
            <>
                <InputSwitch checked={isActive} onChange={(e:any) => UpdateStatusUser(e)} />
            </>
        )
    };

    const header = renderHeader();

    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} 
                    loading={loading} filterDisplay="menu"
                    globalFilterFields={['user','isActive']}
                    header={header} emptyMessage="No user found.">
                    <Column field="user" header="User" style={{ minWidth: '12rem' }} body={BodyUserTemplate} />
                    <Column field="isActive" header="Status" style={{ minWidth: '12rem' }} body={BodyStatusTemplate} />
                    <Column field="role" header="Role" style={{ minWidth: '12rem' }} 
                            body={(u: User) => <BodyUserRoleTemplate rowData={u} 
                            stateLoading={setLoading} fetchDataRoleOptions ={roleOptions}/>} />
                </DataTable>
            </div>
        </>
    );
}
type PropBodyUserRoleTemplate = {
    rowData: User,
    stateLoading: React.Dispatch<React.SetStateAction<boolean>>,
    fetchDataRoleOptions: RoleOptions[],
}

const BodyUserRoleTemplate = ({ rowData, stateLoading ,fetchDataRoleOptions}: PropBodyUserRoleTemplate) => {
    const idUser: string = rowData?.id || '';
    const [userRoles, setUserRoles] = useState<RoleOptions[]>([]);
    const [isLoad, setIsLoad] = useState(true);

    const fetchDataUserRole = async () => {
        setIsLoad(true);
        const userRoleRes = await ApiGetUserRoleByIdUser(idUser);
        setIsLoad(false);
        if (userRoleRes && userRoleRes.code === 200) {
            const arrSelectedRole: RoleOptions[] = [];
            userRoleRes.data.forEach(item => {
                const roleSelected = fetchDataRoleOptions.find(role => role.idRole === item.roleId);
                if (roleSelected && item.isActive) {
                    arrSelectedRole.push(roleSelected)
                }
            });
            setUserRoles(arrSelectedRole);
        }
    };

    useEffect(() => {
        if (fetchDataRoleOptions.length) {
            fetchDataUserRole();
        }
    }, [fetchDataRoleOptions.length]);

    const HandleSetUserRole = async (e: MultiSelectChangeEvent) => {
        const arrValue = e.value;
        const selectedIdRole = e.selectedOption.idRole;
        const isActive = arrValue.some((item: RoleOptions) => item.idRole === selectedIdRole);

        const userRole: UserRole = {
            id: '',
            userId: idUser,
            roleId: selectedIdRole,
            dateFix: null,
            dateCreate: null,
            isActive: isActive,
        }

        const res = await AddOrUpdateUserRole(userRole);
        if (res) {
            if (res.code === 200 || res.code === 201) {
                stateLoading(true)
                fetchDataUserRole()
            }
        }
    };

    return (
        <div className="card flex justify-content-center">
            {!isLoad && <MultiSelect
                value={userRoles}
                onChange={HandleSetUserRole}
                options={fetchDataRoleOptions}
                optionLabel="name"
                placeholder="Select Role"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
                filter
            />}
        </div>
    );
};