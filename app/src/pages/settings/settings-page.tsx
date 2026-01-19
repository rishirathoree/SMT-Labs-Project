import React, { lazy } from 'react';
const FormsWhole = lazy(() => import('./subcomps/Form'));
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router';
const Settings: React.FC = () => {
    return (
        <div className="space-y-4 py-4">
            <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator> / </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FormsWhole />
        </div>
    );
};

export default Settings;