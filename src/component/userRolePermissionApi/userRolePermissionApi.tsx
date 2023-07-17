
import React, { useEffect, useState } from 'react';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { ApiGetUsers, User } from '@/services/userApi';
import { ApiGetRoles, Role } from '@/services/roleApi';
import { ApiGetPermissions, Permission } from '@/services/permissionApi';
import { UserRole } from '@/services/userRoleApi';
import { RolePermission } from '@/services/rolePermission';

export default function UserRolePermission() {
    const [users, setUsers] = useState<User[]>();
    const [permisions, setPermisions] = useState<Permission[]>();
    const [roles, setRoles] = useState<Role[]>();
    const [userRole, setUserRole] = useState<UserRole[]>();
    const [rolePermission, setRolePermission] = useState<RolePermission[]>();

    useEffect(() => {
        const fetchDataUsers = async () => {
            const res = await ApiGetUsers();
            if (res && res.code === 200) {
                setUsers(res.data);
            }
        }

        fetchDataUsers();
        
        const fetchDataRoles = async () => {
            const res = await ApiGetRoles();
            if (res && res.code === 200) {
                setRoles(res.data);
            }
        }

        fetchDataRoles();
        
        const fetchDataPermissions = async () => {
            const res = await ApiGetPermissions();
            if (res && res.code === 200) {
                setPermisions(res.data);
            }
        }

        fetchDataPermissions();
        
        const fetchDataUserRole = async () => {
            // const res = await ApiGetUserRoles();
            // if (res && res.code === 200) {
            //     setUserRole(res.data);
            // }
        }

        fetchDataUserRole();

        const fetchDataRolePermissions = async () => {
            // const res = await ApiGetRolePermissions();
            // if (res && res.code === 200) {
            //     setRolePermission(res.data);
            // }
        }

        fetchDataRolePermissions();
    }, []);

    // const onIngredientsChange = (e: CheckboxChangeEvent) => {
    //     let _users = [...users];

    //     if (e.checked)
    //         _users.push(e.value);
    //     else
    //         _users.splice(_users.indexOf(e.value), 1);

    //     setUsers(_users);
    // }

    return (
<></>
        // <div className="card flex flex-wrap justify-content-center gap-3">
            
        //     <div className="flex align-items-center">
        //         <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
        //         <label htmlFor="ingredient1" className="ml-2">Cheese</label>
        //     </div>
        // </div>
    );
}
