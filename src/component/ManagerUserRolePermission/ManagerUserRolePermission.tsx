import ManagerRolePermission from "./RolePermission";
import ManagerUserRole from "./UserRole";

export default function ManagerUserRolePermission() {
  return (
    <div style={{}}>
      <div style={{display:'flex',width:'100vw'}}>
        <ManagerRolePermission />
      </div>
      <div style={{display:'flex',width:'100vw',background:'red'}}>
        <ManagerUserRole />
      </div>
    </div>
  )
}
