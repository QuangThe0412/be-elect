import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ApiGetUsers, ApiUpdateStatusUser, User } from '@/services/userApi';
import { ApiDeletedRole, ApiGetRoles, Role } from '@/services/roleApi';
import { AddOrUpdateUserRole, ApiGetUserRoleByIdUser, UserRole } from '@/services/userRoleApi';
import { Toast } from 'primereact/toast';
import { InputSwitch } from "primereact/inputswitch";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { RolePermission } from '@/services/rolePermission';
import { Permission } from '@/services/permissionApi';

interface PermissionOptions {
    idPermission: string;
    name: string;
}

export default function ManagerRolePermission() {
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [roleOptions, setRoleOptions] = useState<PermissionOptions[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        user: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        isActive: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const toast = useRef<Toast>(null);
    const [roles, setRoles] = useState<Role[]>();
    const show = () => {
        toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };

    const fetchDataRole = async () => {
        const roleRes = await ApiGetRoles();
        if (roleRes && roleRes.code === 200) {
            setRoles(roleRes.data);
        }
    };

    useEffect(() => {
        fetchDataRole();
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

    const BodyRoleTemplate = (rowData: Role) => {
        return <>
            <span>{rowData.name}</span>
        </>;
    };

    const BodyIsActiveTemplate = (rowData: Role) => {
        let isActive = rowData.isDeleted;
        setLoading(false);
        
        const UpdateStatusRole = async (e: any) => {
            isActive = e.target.value;
            if(isActive){
                console.log({isActive})
            } else {
                console.log({isActive})
                // rowData.isDeleted = isActive;
                // const res = await ApiDeletedRole(rowData.id);
                // if (res && res.code === 200) {
                //     setLoading(prev => !prev);
                // }
            }
        }
        return (
            <>
                <InputSwitch checked={isActive} onChange={(e: any) => UpdateStatusRole(e)} />
            </>
        )
    };

    const header = renderHeader();

    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={roles} paginator rows={10} dataKey="id" filters={filters}
                    loading={loading} filterDisplay="menu"
                    globalFilterFields={['user', 'isActive']}
                    header={header} emptyMessage="No user found.">
                    <Column field="role" header="Role" style={{ minWidth: '12rem' }} body={BodyRoleTemplate} />
                    <Column field="isActive" header="IsActive" style={{ minWidth: '12rem' }} body={BodyIsActiveTemplate} />
                    {/* <Column field="permission" header="Permission" style={{ minWidth: '12rem' }}
                            body={(u: Role) => <BodyRolePermissionTemplate rowData={u}
                            stateLoading={setLoading} fetchDataPermissionOptions={roleOptions} />} />
                 */}
                </DataTable>
            </div>
        </>
    );
}
type PropBodyRolePermissionTemplate = {
    rowData: Permission,
    stateLoading: React.Dispatch<React.SetStateAction<boolean>>,
    fetchDataPermissionOptions: PermissionOptions[],
}

const BodyRolePermissionTemplate = ({ rowData, stateLoading, fetchDataPermissionOptions }: PropBodyRolePermissionTemplate) => {
    const idPermission: string = rowData?.id || '';
    const [userRoles, setUserRoles] = useState<PermissionOptions[]>([]);
    const [isLoad, setIsLoad] = useState(true);

    const fetchDataRolePermission = async () => {
        // setIsLoad(true);
        // const rolePermissionRes = await ApiGetRolePermissionByIdPermission(idPermission);
        // setIsLoad(false);
        // if (rolePermissionRes && rolePermissionRes.code === 200) {
        //     const arrSelectedPermission: PermissionOptions[] = [];
        //     rolePermissionRes.data.forEach(item => {
        //         const roleSelected = fetchDataPermissionOptions.find(p => p.idRole === item.roleId);
        //         if (roleSelected && item.isActive) {
        //             arrSelectedPermission.push(roleSelected)
        //         }
        //     });
        //     setUserRoles(arrSelectedPermission);
        // }
    };

    useEffect(() => {
        if (fetchDataPermissionOptions.length) {
            fetchDataRolePermission();
        }
    }, [fetchDataPermissionOptions.length]);

    const HandleSetUserRole = async (e: MultiSelectChangeEvent) => {
        const arrValue = e.value;
        const selectedIdPermission = e.selectedOption.idPermission;
        const isActive = arrValue.some((item: PermissionOptions) => item.idPermission === selectedIdPermission);

        // const userRole: RolePermission = {
        //     id: '',
        //     permissionId: idPermission,
        //     // roleId: selectedIdRole,
        //     dateFix: null,
        //     dateCreate: null,
        //     isActive: isActive,
        // }

        // const res = await AddOrUpdateUserRole(userRole);
        // if (res) {
        //     if (res.code === 200 || res.code === 201) {
        //         stateLoading(true)
        //         fetchDataUserRole()
        //     }
        // }
    };

    return (
        <div className="card flex justify-content-center">
            {!isLoad && <MultiSelect
                value={userRoles}
                onChange={HandleSetUserRole}
                // options={fetchDataRoleOptions}
                optionLabel="name"
                placeholder="Select Role"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
                filter
            />}
        </div>
    );
};