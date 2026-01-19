
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
import { useQuery } from '@tanstack/react-query';
import Filter from './subcomps/Filter';
import TableFloat from './subcomps/Table';
import PaginationComponent from './subcomps/pagination';
import { OrderServices } from '@/services/orders.service';
import NotFoundEmptyPage from '@/components/not-data/not-found';

const OrdersPage: FC = () => {

  const [filter, setFilter] = useState({
    currentPage: 1,
  })
  const GetOrders = async () => {
    return OrderServices.GetOrders()
  }

  const { data, isPending } = useQuery({
    queryKey: ["orders", filter],
    queryFn: GetOrders,
    select: (res) => res.data,
  })

  console.log(data, isPending, 'data, isPending')
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
                <BreadcrumbPage>Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Filter />
          {data && data?.orders && data?.orders.length === 0 && <NotFoundEmptyPage description="Please create a new orders" title={"No Orders found"} />}
          {data?.orders && data?.orders.length > 0 && <TableFloat data={data?.orders} />}
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

export default OrdersPage;