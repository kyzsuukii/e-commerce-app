"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import axios, { AxiosError } from "axios";
import { config } from "@/lib/config";
import { toast } from "sonner";

interface DataTableProps<TData> {
  data: TData[];
}

async function updateStatus(orderId: number, orderStatus: string) {
  try {
    const { data, status } = await axios.put(
      `${config.SERVER_API_URL}/v1/order/status`,
      {
        orderId,
        orderStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      }
    );
    if (status === 200) {
      return toast.success(data.msg, {
        action: {
          label: "refresh",
          onClick: () => window.location.reload(),
        },
      });
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 401) {
        localStorage.clear();
        window.location.reload();
      }
      return toast.error(error.response?.data.errors[0].msg);
    } else {
      return toast.error("An unexpected error occurred");
    }
  }
}

async function deleteOrder(orderId: number) {
  try {
    const { status, data } = await axios.delete(
      `${config.SERVER_API_URL}/v1/order/delete`,
      {
        data: {
          orderId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      }
    );
    if (status === 200) {
      return toast.success(data.msg, {
        action: {
          label: "refresh",
          onClick: () => window.location.reload(),
        },
      });
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 401) {
        localStorage.clear();
        window.location.reload();
      }
      return toast.error(error.response?.data.errors[0].msg);
    } else {
      return toast.error("An unexpected error occurred");
    }
  }
}

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="font-bold">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => <div>{row.getValue("total_amount")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return <div>{row.getValue("address")}</div>;
    },
  },
  {
    accessorKey: "order_date",
    header: "Order Date",
    cell: ({ row }) => {
      return (
        <div>{new Date(row.getValue("order_date")).toLocaleDateString()}</div>
      );
    },
  },
  {
    accessorKey: "order_status",
    header: "Order Status",
    cell: ({ row }) => {
      return <Badge>{row.getValue("order_status")}</Badge>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            <DropdownMenuItem
              disabled={row.getValue("order_status") === "PENDING"}
              className={cn(
                row.getValue("order_status") === "PENDING" && "text-secondary"
              )}
              onClick={() => updateStatus(row.getValue("id"), "PENDING")}
            >
              PENDING
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={row.getValue("order_status") === "PROCESSING"}
              className={cn(
                row.getValue("order_status") === "PROCESSING" &&
                  "text-secondary"
              )}
              onClick={() => updateStatus(row.getValue("id"), "PROCESSING")}
            >
              PROCESSING
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={row.getValue("order_status") === "SHIPPED"}
              className={cn(
                row.getValue("order_status") === "SHIPPED" && "text-secondary"
              )}
              onClick={() => updateStatus(row.getValue("id"), "SHIPPED")}
            >
              SHIPPED
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={row.getValue("order_status") === "DELIVERED"}
              className={cn(
                row.getValue("order_status") === "DELIVERED" && "text-secondary"
              )}
              onClick={() => updateStatus(row.getValue("id"), "DELIVERED")}
            >
              DELIVERED
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => deleteOrder(row.getValue("id"))}>
              <span className="text-red-600">Delete Order</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrderTable({ data }: DataTableProps<any>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Address..."
          value={(table.getColumn("address")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("address")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
