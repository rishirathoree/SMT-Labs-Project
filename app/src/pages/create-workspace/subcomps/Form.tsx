"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import { useAuthState } from "@/hooks/use-auth";
import { WorkspaceServices } from "@/services/workspace.service";
import { setAuth } from "@/store/slices/auth.slice";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Form() {
  const {dispatch} = useAuthState()
  const navigate = useNavigate()
  const [name, setName] = useState<string>("Northlane Traders Pvt. Ltd");
  const [description, setDescription] = useState<string>("A wholesale trading company managing inventory, suppliers, and stock distribution across multiple locations.")

  const handleSubmit = async () => {
    return WorkspaceServices.Create({ name, description })
  }

  const { mutate: createWp, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: (data) => {
      const nestedValues = data.data
      localStorage.setItem("token", nestedValues.token)
      localStorage.setItem("organizations", JSON.stringify(nestedValues.org))
      dispatch(setAuth({ token: nestedValues.token, organizations: nestedValues.org }))
      toastManager.add({
        title: "Success",
        description: "Organization Created Successfully",
        type: "success",
      })
      navigate("/")
    },
  })

  return (
    <div className="flex items-center justify-center w-full p-10">
      <div className="flex justify-center flex-col sm:mx-auto sm:max-w-2xl h-screen">
        <h3 className="text-lg font-semibold text-foreground">
          Create your organization
        </h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Set up your organization to manage teams, roles, and resources from one
          centralized workspace.
        </p>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="col-span-full sm:col-span-3">
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="first-name" className="font-medium">
                Orgnizations Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="first-name"
                name="first-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                required
                placeholder="Emma"
                className="mt-2"
              />
            </div>
            <div className="col-span-full">
              <Label htmlFor="email" className="font-medium">
                Work email<span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                autoComplete="description"
                required
                placeholder="Enter description"
                className="mt-2"
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              onClick={() => { navigate("/") }}
              type="button"
              variant="outline"
              className="whitespace-nowrap"
            >
              Go back
            </Button>
            <Button type="submit"
              onClick={() => {
                createWp()
              }}
              className="whitespace-nowrap">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}