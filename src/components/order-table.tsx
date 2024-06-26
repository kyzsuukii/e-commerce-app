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
import {
  ChevronDown,
  CircleCheck,
  CircleDashed,
  MoreHorizontal,
  Package,
  PackageSearch,
  Trash,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
          Authorization: `Bearer ${config.SESSION}`,
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
          Authorization: `Bearer ${config.SESSION}`,
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

async function deleteOrderItem(orderItemId: number) {
  try {
    const { status, data } = await axios.delete(
      `${config.SERVER_API_URL}/v1/order/item/delete`,
      {
        data: {
          orderItemId,
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
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Status
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="mx-2">
                  <DropdownMenuItem
                    disabled={row.getValue("order_status") === "PENDING"}
                    className={cn(
                      row.getValue("order_status") === "PENDING" &&
                        "text-muted-foreground"
                    )}
                    onClick={() => updateStatus(row.getValue("id"), "PENDING")}
                  >
                    <CircleDashed className="mr-2 h-4 w-4" />
                    PENDING
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={row.getValue("order_status") === "PROCESSING"}
                    className={cn(
                      row.getValue("order_status") === "PROCESSING" &&
                        "text-muted-foreground"
                    )}
                    onClick={() =>
                      updateStatus(row.getValue("id"), "PROCESSING")
                    }
                  >
                    <PackageSearch className="mr-2 h-4 w-4" />
                    PROCESSING
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={row.getValue("order_status") === "SHIPPED"}
                    className={cn(
                      row.getValue("order_status") === "SHIPPED" &&
                        "text-muted-foreground"
                    )}
                    onClick={() => updateStatus(row.getValue("id"), "SHIPPED")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    SHIPPED
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={row.getValue("order_status") === "DELIVERED"}
                    className={cn(
                      row.getValue("order_status") === "DELIVERED" &&
                        "text-muted-foreground"
                    )}
                    onClick={() =>
                      updateStatus(row.getValue("id"), "DELIVERED")
                    }
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    DELIVERED
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={row.getValue("order_status") === "COMPLETED"}
                    className={cn(
                      row.getValue("order_status") === "COMPLETED" &&
                        "text-muted-foreground"
                    )}
                    onClick={() =>
                      updateStatus(row.getValue("id"), "COMPLETED")
                    }
                  >
                    <CircleCheck className="mr-2 h-4 w-4" />
                    COMPLETED
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => deleteOrder(row.getValue("id"))}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrderTable({ data }: DataTableProps<any>) {
  const [expandedOrder, setExpandedOrder] = React.useState(null);

  const toggleExpand = (orderId: any) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

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
    <div className="mx-auto container">
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
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => toggleExpand(row.original.id)}
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
                  {expandedOrder === row.original.id && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        <div className="rounded-md border overflow-hidden border-none">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {row.original.items.map((item: any) => (
                                <TableRow key={item.order_item_id}>
                                  <TableCell>{item.order_item_id}</TableCell>
                                  <TableCell>{item.product_name}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>{item.price}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        deleteOrderItem(item.order_item_id)
                                      }
                                    >
                                      <Trash size={14} />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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
