
import React from 'react'; 
import { SlideMenu } from 'primereact/slidemenu';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';

export default function BasicDemo() {
    const items: MenuItem[] = [
        {
            label:'File',
            icon:'pi pi-fw pi-file',
        },
        {
            label:'Edit',
            icon:'pi pi-fw pi-pencil',
        },
        {
            label:'Users',
            icon:'pi pi-fw pi-user',
        },
        {
            label:'Events',
            icon:'pi pi-fw pi-calendar',
        },
        {
            separator:true
        },
        {
            label:'Quit',
            icon:'pi pi-fw pi-power-off'
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <SlideMenu model={items} viewportHeight={220} menuWidth={175}></SlideMenu>
        </div>
    )
}
        