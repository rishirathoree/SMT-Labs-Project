import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogOverlay,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { CategoriesServices } from '@/services/categories.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastManager } from '@/components/ui/toast';
import { Textarea } from '@/components/ui/textarea';
import { useAuthState } from '@/hooks/use-auth';
const CreateModal: React.FC = () => {

    const [show, setShow] = useState<boolean>(false)
    const [name, setName] = useState<string>("Beverages")
    const [description, setDescription] = useState<string>("Drinks including packaged water, soft drinks, juices, tea, and coffee products")
    const handleSubmit = async () => {
        return CategoriesServices.Create({ name, description })
    }
    const queryClient = useQueryClient();
    const { mutate: createCat, isPending, } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"], });
            setName("")
            setDescription("")
            setShow(false)
            toastManager.add({
                title: "Success",
                description: "Category created successfully",
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

    const {isStaff} = useAuthState()
    console.log(isStaff,'role')

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogTrigger>
                <Button hidden={isStaff} variant="outline">
                    <Plus />
                    Create Category
                </Button>
            </DialogTrigger>
            <DialogOverlay className={"!blur-none z-0"} />
            <DialogContent className=" w-full !p-0 z-0">
                <div className="flex items-center justify-center p-10">
                    <div className="sm:mx-auto sm:max-w-2xl">
                        <h3 className="text-2xl tracking-tight font-semibold text-foreground dark:text-foreground">
                            Create category
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Add a new category to organize products and manage inventory more efficiently.
                        </p>

                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">

                                <div className="col-span-full sm:col-span-6">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="last-name">
                                            Category Name
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            id="last-name"
                                            name="last-name"
                                            placeholder="Enter category name"
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
                                            placeholder="Enter category description"
                                            required
                                        />
                                    </Field>
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