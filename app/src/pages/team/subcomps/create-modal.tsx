import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogOverlay,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastManager } from '@/components/ui/toast';
import { useAuthState } from '@/hooks/use-auth';
import { AuthService } from '@/services/auth.service';

const CreateModal: React.FC = () => {

    const [show, setShow] = useState<boolean>(false)
    const [name, setName] = useState<string>("Adam Smith")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async () => {
        return AuthService.CreateTeamate({ name, email, password, })
    }

    const queryClient = useQueryClient();

    const { mutate: createCat, isPending, error, isError } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"], });
            setName("")
            setEmail("")
            setPassword("")
            setShow(false)
            toastManager.add({
                title: "Success",
                description: "New member created successfully",
                type: "success",
            })
        },
    })

    const { isStaff } = useAuthState()

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogTrigger>
                <Button hidden={isStaff} variant="outline">
                    <Plus />
                    Create Members
                </Button>
            </DialogTrigger>
            <DialogOverlay className={"!blur-none z-0"} />
            <DialogContent className=" w-full !p-0 z-0">
                <div className="flex items-center justify-center p-10">
                    <div className="sm:mx-auto sm:max-w-2xl">
                        <h3 className="text-2xl tracking-tight font-semibold text-foreground dark:text-foreground">
                            Create Members
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Add a new members to organize products and manage inventory more efficiently.
                        </p>

                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                <div className="col-span-full sm:col-span-6">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="last-name">
                                            Full name
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            id="last-name"
                                            name="last-name"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-6">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="last-name">
                                            Email
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            id="last-name"
                                            name="last-name"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </Field>
                                    {isError &&
                                        <p className='mt-2 text-red-500 text-sm'>{(error as any)?.response?.data?.message}, {(error as any)?.response?.data?.description}</p>
                                    }
                                </div>
                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="email">
                                            Password
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="password"
                                            id="email"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            name="email"
                                            placeholder="Enter password"
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