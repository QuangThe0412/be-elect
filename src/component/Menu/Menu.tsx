import { SlideMenu } from 'primereact/slidemenu';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';
import '@/styles/menu.css';
import { BrowserRouter as useNavigate, Link, useLocation } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { useState } from 'react';

export default function MenuLeft() {
    const location = useLocation();
    
    const [activeItem, setActiveItem] = useState(location.pathname);

    const customeTemplate = (label: string, icon: string, to: string) => {
        let isActive = activeItem === to;
        return (
            <Link className={classNames('p-menuitem-link',{isActive})} to={to}
                onClick={() => setActiveItem(to)}>
                <span className={classNames("p-menuitem-icon", { [icon]: true })}></span>
                <span className="p-menuitem-text">{label}</span>
            </Link>
        );
    }

    const items: MenuItem[] = [
        {
            template: customeTemplate('Home', 'pi pi-home', '/'),
        },
        {
            template: customeTemplate('Product', 'pi pi-info', '/products'),
        },
    ];

    return (
        <div className="card flex justify-content-center">
            <SlideMenu model={items}></SlideMenu>
        </div>
    )
}
