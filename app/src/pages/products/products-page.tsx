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
import Filter from "./subcomps/Filter";
import TableFloat from "./subcomps/Table";
import PaginationComponent from "./subcomps/pagination";
import { ProductServices } from "@/services/products.service";
import NotFoundEmptyPage from "@/components/not-data/not-found";
import { Package2 } from "lucide-react";


const ProductPage: FC = () => {
  const [filter, setFilter] = useState({
    currentPage: 1,
    categoryId: "",
  });

  const GetProducts = async () => {
    return ProductServices.Get({
      categoryId: filter.categoryId,
      page: filter.currentPage,
    });
  };

  const { data, isPending } = useQuery<any, any, { products: any[]; pagination: { currentPage: number; totalPages: number; total: number; limit: number } }>({
    queryKey: ["products", filter],
    queryFn: GetProducts,
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
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Filter
        value={filter.categoryId}
        handleFilterChange={(val) => {
          setFilter((prev) => ({ ...prev, categoryId: val, currentPage: 1 }));
        }}
      />

      {isPending && <div>Loading products...</div>}

      {data && data?.products && data?.products.length > 0 && <TableFloat data={data?.products} />}

      {data && data?.products && data?.products.length === 0 && <NotFoundEmptyPage description="Please create a new product" title={"No products found"} />}

      {data?.pagination && (
        <PaginationComponent
          currentPage={data?.pagination.currentPage ?? 1}
          totalPages={data?.pagination.totalPages ?? 1}
          total={data?.pagination.total ?? 0}
          limit={data?.pagination.limit ?? 10}
          onPageChange={(page) =>
            setFilter((prev) => ({ ...prev, currentPage: page }))
          }
        />
      )}
    </div>
  );
};

export default ProductPage;
