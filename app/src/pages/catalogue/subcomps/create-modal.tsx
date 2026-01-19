import React from 'react';

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
const CreateModal: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline">
                    <Plus />
                    Create Catalogue
                </Button>
            </DialogTrigger>
            <DialogOverlay className={"!blur-none"} />
            <DialogContent className=" w-full !p-0">
                <div className="flex items-center justify-center p-10">
                    <div className="sm:mx-auto sm:max-w-2xl">
                        <h3 className="text-2xl tracking-tight font-semibold text-foreground dark:text-foreground">
                            Register to workspace
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Take a few moments to register for your company&apos;s workspace
                        </p>
                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                <div className="col-span-full sm:col-span-3">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="first-name">
                                            First name
                                            <span className=" text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            className='autofill:!bg-yellow-200'
                                            placeholder="First name"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="last-name">
                                            Last name
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id="last-name"
                                            name="last-name"
                                            placeholder="Last name"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="email">
                                            Email
                                            <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="address">Address</FieldLabel>
                                        <Input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Address"
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="city">City</FieldLabel>
                                        <Input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="City"
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="state">State</FieldLabel>
                                        <Input
                                            type="text"
                                            id="state"
                                            name="state"
                                            placeholder="State"
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="postal-code">Postal code</FieldLabel>
                                        <Input
                                            id="postal-code"
                                            name="postal-code"
                                            placeholder="Postal code"
                                        />
                                    </Field>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-end w-full">
                    <DialogClose >
                        <div className="flex w-full items-end justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="whitespace-nowrap"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="whitespace-nowrap">
                                Submit
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;