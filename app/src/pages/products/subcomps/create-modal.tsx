import React, { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogOverlay, DialogTrigger, } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { CategoriesServices } from '@/services/categories.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toastManager } from '@/components/ui/toast';
import { Textarea } from '@/components/ui/textarea';
import { useAuthState } from '@/hooks/use-auth';

import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import { ProductServices } from '@/services/products.service';


const CreateModal: React.FC = () => {

    const [show, setShow] = useState<boolean>(false)
    const [name, setName] = useState<string>("Beverages")
    const [price, setPrice] = useState<number>(100)
    const [totalStock, setTotalStock] = useState<number>(50)
    const [skuCode, setSkuCode] = useState<string>("BEW-MMWS-121")
    const [selectedCategories, setSelectedCategories] = useState<Array<{ label: string, value: string }>>([])
    const [description, setDescription] = useState<string>("Drinks including packaged water, soft drinks, juices, tea, and coffee products")

    const handleSubmit = async () => {
        return ProductServices.Create({ name, description, sku: skuCode, stock: totalStock, categoryId: selectedCategories.map(item => item.value),price })
    }

    const queryClient = useQueryClient();
    const { mutate: CreateProduct, isPending, error, isError } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"], });
            setName("")
            setDescription("")
            setSkuCode("")
            setTotalStock(0)
            setSelectedCategories([])
            setShow(false)
            toastManager.add({
                title: "Success",
                description: "Product created successfully",
                type: "success",
            })
        },
    })

    console.log(error, isError, 'error,isError')

    const GetCategories = async () => {
        return CategoriesServices.Get({
            page: "all",
        })
    }

    const { data, isPending: isPendingCategories } = useQuery({
        queryKey: ["categories",],
        queryFn: GetCategories,
        select: (res) => res.data.categories, // { categories, pagination }
    })

    const { isStaff } = useAuthState()

    const options = useMemo(() => {
        return data?.map((item: any) => ({ label: item.name, value: item._id })) || []
    }, [data])

    return (
        <Dialog disablePointerDismissal={true} open={show} onOpenChange={setShow}>
            <DialogTrigger>
                <Button hidden={isStaff} variant="outline">
                    <Plus />
                    Create Products
                </Button>
            </DialogTrigger>
            <DialogOverlay className={"!blur-none z-0"} />
            <DialogContent className=" w-full !p-0 z-0">
                <div className="flex items-center justify-center p-10">
                    <div className="sm:mx-auto sm:max-w-2xl">
                        <h3 className="text-2xl tracking-tight font-semibold text-foreground dark:text-foreground">
                            Create product
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Add a new product to track stock levels, assign categories, and manage inventory efficiently.
                        </p>


                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">

                                <div className="col-span-full sm:col-span-6">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="last-name">
                                            Product Name
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            id="last-name"
                                            name="last-name"
                                            placeholder="Enter product name"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="sku-code">
                                            SKU Code
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setSkuCode(e.target.value)}
                                            value={skuCode}
                                            id="sku-code"
                                            name="sku-code"
                                            placeholder="Enter product SKU code"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="total-stock">
                                            Total Stock
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="number"
                                            onChange={(e) => setTotalStock(Number(e.target.value))}
                                            value={totalStock}
                                            id="total-stock"
                                            name="total-stock"
                                            placeholder="Enter product total stock"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="email">
                                            Description
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Textarea
                                            id="email"
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            name="email"
                                            placeholder="Enter product description"
                                            required
                                        />
                                    </Field>
                                </div>

                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="email">
                                            Price
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            value={price}
                                            name="email"
                                            placeholder="Enter product description"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-6">
                                    <div className="*:not-first:mt-2">
                                        <Label>Select categories</Label>
                                        <MultipleSelector
                                            commandProps={{
                                                label: "Select categories",
                                            }}
                                            onChange={(e) => {
                                                setSelectedCategories(e)
                                            }}
                                            disabled={isPendingCategories}
                                            loadingIndicator={<p className="text-center text-sm">Loading...</p>}
                                            defaultOptions={options}
                                            emptyIndicator={<p className="text-center text-sm">No results found</p>}
                                            hideClearAllButton
                                            hidePlaceholderWhenSelected
                                            placeholder="Select categories"
                                        />
                                    </div>
                                </div>

                                {isError && (
                                                                    <div className="col-span-full sm:col-span-6">
                                        <Label>{(error as any)?.response?.data?.message?.includes("duplicate key")
                                                ? "Product with this SKU code already exists"
                                                : (error as any)?.response?.data?.message}</Label>

                                    </div>
                                )}

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
                        <Button onClick={() => { CreateProduct() }} type="submit" className="whitespace-nowrap">
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;

