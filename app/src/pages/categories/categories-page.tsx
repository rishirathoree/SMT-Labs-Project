
import { useState, type FC } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router';
import { CategoriesServices } from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';
import Filter from './subcomps/Filter';
import TableFloat from './subcomps/Table';
import PaginationComponent from './subcomps/pagination';
import NotFoundEmptyPage from '@/components/not-data/not-found';

const CategoriesPage: FC = () => {

  const [filter, setFilter] = useState({
    currentPage: 1,
  })

  const GetCategories = async () => {
    return CategoriesServices.Get({
      page: filter.currentPage,
    })
  }

  const { data, isPending } = useQuery({
    queryKey: ["categories", filter],
    queryFn: GetCategories,
    select: (res) => res.data, // { categories, pagination }
  })
  return (
    <>
      {isPending && <div>loading...</div>}
      {data &&
        <div className="space-y-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator> / </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Filter />
      {data && data?.categories && data?.categories.length === 0 && <NotFoundEmptyPage description="Please create a new categories" title={"No Categories found"} />}
{data?.categories && data?.categories.length > 0 &&          <TableFloat data={data?.categories} />}
          <PaginationComponent
            currentPage={data?.pagination?.currentPage ?? 1}
            totalPages={data?.pagination?.totalPages ?? 1}
            total={data?.pagination?.total ?? 0}
            limit={data?.pagination?.limit ?? 10}
            onPageChange={(page) =>
              setFilter((prev) => ({ ...prev, currentPage: page }))
            }
          />
        </div>
      }
    </>
  );
};

export default CategoriesPage;