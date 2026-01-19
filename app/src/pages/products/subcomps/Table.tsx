"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FC } from "react";

interface Products {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  description: string;
  createdAt: string;
}

interface Props {
  data: Products[]
}



const TableFloat: FC<Props> = ({data}:Props) => {
  const renderTaskRow = (task: Products) => {
    return (
      <TableRow key={task.id} className="hover:bg-muted/50 divide-x ring-0 border-0 shadow-none">
        <TableCell
          className="focus-visible:outline-none px-4 font-medium focus-visible:bg-muted cursor-pointer"
        >
          {task.name}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground truncate">
          {task.sku}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground truncate">
          {task.stock}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground truncate">
          {task.price}
        </TableCell>


        <TableCell className="px-4 text-sm text-muted-foreground">
          {new Date(task.createdAt).toLocaleDateString()}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="">
      <Table className="">
        <TableHeader>
          <TableRow className="hover:bg-transparent divide-x border-y">
            <TableHead className="px-4 font-medium">Title</TableHead>
            <TableHead className="px-4 font-medium">SKU Code</TableHead>
            <TableHead className="px-4 font-medium">Stock</TableHead>
            <TableHead className="px-4 font-medium">Price</TableHead>
            <TableHead className="px-4 font-medium">Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="!divide-y">{data?.map(renderTaskRow)}</TableBody>
      </Table>
    </div>
  );
};

export default TableFloat;