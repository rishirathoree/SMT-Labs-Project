"use client";

import { useState, type FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import TableFloat from "./subcomps/Table";
import { AuthService } from "@/services/auth.service";
import CreateModal from "./subcomps/create-modal";

const TeamPage: FC = () => {

  const GetTeams = async () => {
    return AuthService.GetTeams()
  };

  const { data, isPending } = useQuery<any, any, { users: any[]}>({
    queryKey: ["users", ],
    queryFn: GetTeams,
    select: (res) => res.data,
  });

  return (
    <div className="space-y-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator> / </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Teams</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="float-right"><CreateModal /></div>

      {isPending && <div>Loading products...</div>}

      {data && <TableFloat data={data?.users} />}
    </div>
  );
};

export default TeamPage;
