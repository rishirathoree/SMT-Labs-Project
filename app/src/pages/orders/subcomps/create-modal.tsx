import { useMemo, useState, type FC } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogOverlay, DialogTrigger, } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toastManager } from '@/components/ui/toast';
import { useAuthState } from '@/hooks/use-auth';
import { ProductServices } from '@/services/products.service';
import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiselect';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { OrderServices } from '@/services/orders.service';


const CreateModal: React.FC = () => {

    const [show, setShow] = useState<boolean>(false)
    const [selectedProducts, setSelectedProducts] = useState<Array<{ productId: string; name: string; quantity: number,price: number }>>([])

    console.log(selectedProducts,'selectedProducts')

    const handleSubmit = async () => {
        return OrderServices.CreateOrder(selectedProducts)
    }
    const queryClient = useQueryClient();
    const { mutate: createCat, isPending, } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"], });
            setShow(false)
            toastManager.add({
                title: "Success",
                description: "Order created successfully",
                type: "success",
            })
        },

        onError: (error: any) => {
            const errorValue = error?.response?.data
            toastManager.add({
                title: errorValue?.message || "Error",
                description: errorValue?.description || "Category creation failed",
                type: "error",
            })
        }
    })

    const { isStaff } = useAuthState()

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

    const { data, isPending: isProductPending } = useQuery<any, any, { products: any[]; pagination: { currentPage: number; totalPages: number; total: number; limit: number } }>({
        queryKey: ["products", filter],
        queryFn: GetProducts,
        select: (res) => res.data,
    });


    const options = useMemo(() => {
        return data?.products?.map((item: any) => ({ label: item.name, value: item._id, price: item.price })) || []
    }, [data])

    const increaseQty = (productId: string) => {
        setSelectedProducts(prev =>
            prev.map(p =>
                p.productId === productId
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            )
        )
    }

    const decreaseQty = (productId: string) => {
        setSelectedProducts(prev =>
            prev.map(p =>
                p.productId === productId
                    ? { ...p, quantity: Math.max(1, p.quantity - 1) }
                    : p
            )
        )
    }


    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogTrigger>
                <Button hidden={isStaff} variant="outline">
                    <Plus />
                    Create Orders
                </Button>
            </DialogTrigger>
            <DialogOverlay className={"!blur-none z-0"} />
            <DialogContent className="">
                <div className="flex items-start justify-center p-4 h-full">
                    <div className="sm:mx-auto sm:max-w-2xl">
                        <h3 className="text-2xl tracking-tight font-semibold text-foreground dark:text-foreground">
                            Create Orders
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Create a new order by selecting products and quantities. Inventory stock will be updated automatically.
                        </p>

                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">

                                <div className="col-span-full sm:col-span-6">
                                    <div className="*:not-first:mt-2">
                                        <Label>Select categories</Label>
                                        <MultipleSelector
                                            commandProps={{ label: "Select products" }}
                                            onChange={(items) => {
                                                setSelectedProducts(
                                                    items.map((item: any) => ({
                                                        productId: item.value,
                                                        name: item.label,
                                                        quantity: 1,
                                                        price: item.price
                                                    }))
                                                )
                                            }}
                                            disabled={isProductPending}
                                            defaultOptions={options}
                                            placeholder="Select products"
                                        />

                                    </div>
                                </div>

                                <div className="col-span-full sm:col-span-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="divide-x">
                                                <TableHead>Product</TableHead>
                                                <TableHead className="text-center">Quantity</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {selectedProducts.map((item) => (
                                                <TableRow key={item.productId} className="divide-x size-min">
                                                    <TableCell className="font-medium">
                                                        {item.name}
                                                    </TableCell>

                                                    <TableCell className="text-center">
                                                        {item.quantity}
                                                    </TableCell>

                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                size="icon-sm"
                                                                variant="outline"
                                                                onClick={() => decreaseQty(item.productId)}
                                                            >
                                                                −
                                                            </Button>

                                                            <Button
                                                                size="icon-sm"
                                                                variant="outline"
                                                                onClick={() => increaseQty(item.productId)}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-end w-full">
                    <div className="flex w-full items-end justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="whitespace-nowrap"
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => { createCat() }} type="submit" className="whitespace-nowrap">
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;
