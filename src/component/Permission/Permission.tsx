
import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { TreeNode } from 'primereact/treenode';
export default function Permission() {
    const [data] = useState<TreeNode[]>([
        {
            expanded: true,
            className: 'bg-indigo-500 text-white',
            style: { borderRadius: '12px' },
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    className: 'bg-purple-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            className: 'bg-purple-500 text-white',
                            style: { borderRadius: '12px' },
                            data: {
                                label: 'Sales'
                            }
                        },
                        {
                            className: 'bg-purple-500 text-white',
                            style: { borderRadius: '12px' },
                            data: {
                                label: 'Marketing'
                            }
                        }
                    ]
                },
                {
                    expanded: true,
                    className: 'bg-teal-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            className: 'bg-teal-500 text-white',
                            style: { borderRadius: '12px' },
                            data: {
                                label: 'Development'
                            }
                        },
                        {
                            className: 'bg-teal-500 text-white',
                            style: { borderRadius: '12px' },
                            data: {
                                label: 'UI/UX Design'
                            }
                        }
                    ]
                }
            ]
        }
    ]);

    const nodeTemplate = (node: TreeNode) => {
        if (node.data) {
            return (
                <div className="flex flex-column">
                    <div className="flex flex-column align-items-center">
                        <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" />
                        <span className="font-bold mb-2">{node.data.name}</span>
                        <span>{node.data.title}</span>
                    </div>
                </div>
            );
        }
        return node.label;
    };

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
        </div>
    );
}
