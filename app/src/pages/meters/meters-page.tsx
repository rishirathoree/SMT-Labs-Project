import React from 'react';
import { DottedPatternAreaChart } from './subcomps/dotted-chart';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router';

const MetersPage: React.FC = () => {
    return (
        <div className='p-4 space-y-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator> / </BreadcrumbSeparator>
                    <BreadcrumbItem aria-disabled>
                        <BreadcrumbLink>Usage Billing</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator> / </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Meters</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='grid grid-cols-2 gap-2'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <DottedPatternAreaChart key={index} />
                ))}
            </div>
        </div>
    );
};

export default MetersPage;