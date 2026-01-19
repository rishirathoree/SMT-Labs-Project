import { ArrowUpRightIcon, FileExclamationPoint } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
interface Props {
    title: string;
    description: string
}
import { type FC } from 'react';

const NotFoundEmptyPage: FC<Props> = ({title, description, }:Props) => {
    return (
        <Empty className="min-h-[60vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileExclamationPoint />
        </EmptyMedia>
        <EmptyTitle>{title || "No Projects Yet"}</EmptyTitle>
        <EmptyDescription>
          {description || "You haven't created any projects yet. Get started by creating a new project."}
        </EmptyDescription>
      </EmptyHeader>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
    );
};

export default NotFoundEmptyPage;
