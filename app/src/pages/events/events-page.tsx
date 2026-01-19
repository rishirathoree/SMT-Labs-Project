import React, { lazy } from 'react';
const Table04 = lazy(()=>import("@/pages/events/subcomps/table"))
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const EventPage: React.FC = () => {
    return (
           <div className="space-y-4 py-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator> / </BreadcrumbSeparator>
                    <BreadcrumbItem aria-disabled>
                        <BreadcrumbLink>Usage Billings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator> / </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Events</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
      <Table04 />
    </div>
    );
};

export default EventPage;