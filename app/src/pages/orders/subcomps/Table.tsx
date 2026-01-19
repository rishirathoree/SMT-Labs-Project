"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderServices } from "@/services/orders.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Loader2 } from "lucide-react";
import { useState, type FC } from "react";

interface Order {
  _id: string;
  orderSequence: string;
  totalAmount: number;
  status: string;
  organizationId: {
    name: string;
  };
  createdAt: string;
}

interface Props {
  data: Order[];
}

const TableFloat: FC<Props> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: cancelOrder, isPending } = useMutation({
    mutationFn: async (orderId: string) => {
      console.log(orderId)
      return OrderServices.CancelOrder(orderId)
    },
    onSuccess: () => {
      setSelectedId(null);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const renderTaskRow = (task: Order) => {
    const isSelected = selectedId === task._id;
    const isCancelled = task.status === "cancelled";

    return (
      <TableRow
        key={task._id}
        className={`
          hover:bg-muted/50 divide-x
          ${isSelected ? "bg-muted/50" : ""}
          ${isCancelled ? "opacity-60" : ""}
        `}
      >
        <TableCell className="px-4 font-medium">
          {task.orderSequence}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground truncate">
          {task.organizationId.name}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground capitalize">
          {task.status}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground">
          ₹{task.totalAmount}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground">
          {new Date(task.createdAt).toLocaleDateString()}
        </TableCell>

        <TableCell className="px-4">
          <Button
            size="sm"
            variant="outline"
            disabled={isCancelled || (isPending && isSelected)}
            onClick={() => {
              setSelectedId(task._id);
              cancelOrder(task._id);
            }}
          >
            {isPending && isSelected ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Minus className="mr-2 h-4 w-4" />
            )}
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="divide-x border-y">
          <TableHead className="px-4">Order ID</TableHead>
          <TableHead className="px-4">Organization</TableHead>
          <TableHead className="px-4">Status</TableHead>
          <TableHead className="px-4">Total</TableHead>
          <TableHead className="px-4">Created</TableHead>
          <TableHead className="px-4">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y">
        {data?.map(renderTaskRow)}
      </TableBody>
    </Table>
  );
};

export default TableFloat;
