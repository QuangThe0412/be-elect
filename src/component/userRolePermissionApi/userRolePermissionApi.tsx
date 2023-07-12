
import React, { useEffect, useState } from 'react';
import { ApiGetPermissions, ApiGetRoles, ApiGetUserRolePermission, ApiGetUsers, Permission, Role, User, UserRolePermission } from '@/services/userRolePermissionApi';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

export default function UserRolePermission() {
    const [users, setUsers] = useState<User[]>();
    const [permisions, setPermisions] = useState<Permission[]>();
    const [roles, setRoles] = useState<Role[]>();
    const [userRolePermission, setUserRolePermission] = useState<UserRolePermission[]>();

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
        
        const fetchDataUserRolePermissions = async () => {
            const res = await ApiGetUserRolePermission();
            if (res && res.code === 200) {
                setUserRolePermission(res.data);
            }
        }

        fetchDataUserRolePermissions();
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
