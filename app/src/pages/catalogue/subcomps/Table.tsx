"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  notes: string;
}

const tasks: Task[] = [
  {
    id: "TASK-001",
    title: "Implement User Authentication",
    assignee: "Sarah Chen",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-25",
    notes: "OAuth 2.0 integration with Google and GitHub providers",
  },
  {
    id: "TASK-002",
    title: "Design Dashboard UI",
    assignee: "Michael Torres",
    status: "completed",
    priority: "medium",
    dueDate: "2024-03-20",
    notes: "Finalize dashboard layout with responsive grid system",
  },
  {
    id: "TASK-003",
    title: "API Performance Optimization",
    assignee: "Emma Rodriguez",
    status: "pending",
    priority: "urgent",
    dueDate: "2024-03-22",
    notes: "Reduce API response time by implementing caching strategy",
  },
  {
    id: "TASK-004",
    title: "Write Unit Tests",
    assignee: "James Wilson",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-03-28",
    notes: "Achieve 80% code coverage for authentication module",
  },
  {
    id: "TASK-005",
    title: "Database Migration",
    assignee: "Olivia Martinez",
    status: "blocked",
    priority: "high",
    dueDate: "2024-03-24",
    notes: "Waiting for infrastructure team approval before proceeding",
  },
  {
    id: "TASK-006",
    title: "Update Documentation",
    assignee: "Lucas Anderson",
    status: "pending",
    priority: "low",
    dueDate: "2024-03-30",
    notes: "Document new API endpoints and authentication flow",
  },
  {
    id: "TASK-007",
    title: "Security Audit",
    assignee: "Sophia Taylor",
    status: "completed",
    priority: "urgent",
    dueDate: "2024-03-19",
    notes: "Conducted comprehensive security review and vulnerability assessment",
  },
  {
    id: "TASK-008",
    title: "Email Notification Service",
    assignee: "Aarav Patel",
    status: "pending",
    priority: "medium",
    dueDate: "2024-04-01",
    notes: "Implement background job for sending batch emails",
  },
  {
    id: "TASK-009",
    title: "Build Admin Analytics Dashboard",
    assignee: "Lila Thompson",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-29",
    notes: "Include charts for revenue, user growth, and retention",
  },
  {
    id: "TASK-010",
    title: "Refactor Payment Module",
    assignee: "Ravi Singh",
    status: "blocked",
    priority: "urgent",
    dueDate: "2024-03-23",
    notes: "Dependency on banking API updates",
  },
  {
    id: "TASK-011",
    title: "Create Landing Page",
    assignee: "Isabella Gomez",
    status: "completed",
    priority: "medium",
    dueDate: "2024-03-18",
    notes: "Modern layout with hero section and testimonials",
  },
  {
    id: "TASK-012",
    title: "Optimize Database Indexes",
    assignee: "Ahmed Khan",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-26",
    notes: "Identify slow queries using monitoring tools",
  },
  {
    id: "TASK-013",
    title: "User Role Management",
    assignee: "Maria Lopez",
    status: "pending",
    priority: "medium",
    dueDate: "2024-04-02",
    notes: "Add fine-grained permission support",
  },
  {
    id: "TASK-014",
    title: "Improve Logging System",
    assignee: "Daniel Carter",
    status: "blocked",
    priority: "low",
    dueDate: "2024-03-31",
    notes: "Waiting for new log retention policy approval",
  },
  {
    id: "TASK-015",
    title: "Add Multi-language Support",
    assignee: "Aisha Mohammed",
    status: "completed",
    priority: "high",
    dueDate: "2024-03-17",
    notes: "Support for English, Spanish, and French",
  },
  {
    id: "TASK-016",
    title: "Set Up CI/CD Pipeline",
    assignee: "Ethan Brown",
    status: "in-progress",
    priority: "urgent",
    dueDate: "2024-03-27",
    notes: "GitHub Actions workflow for build and deploy",
  },
  {
    id: "TASK-017",
    title: "Code Review Guidelines",
    assignee: "Nina Vasquez",
    status: "pending",
    priority: "low",
    dueDate: "2024-04-04",
    notes: "Create documentation for consistent code reviews",
  },
  {
    id: "TASK-018",
    title: "Implement Dark Mode",
    assignee: "Leo Martin",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-03-29",
    notes: "Sync theme with user preferences",
  },
  {
    id: "TASK-019",
    title: "Mobile Responsiveness Fixes",
    assignee: "Kiara Mehta",
    status: "pending",
    priority: "high",
    dueDate: "2024-03-28",
    notes: "Improve layout for smaller screen devices",
  },
  {
    id: "TASK-020",
    title: "Integrate Push Notifications",
    assignee: "Mateo Silva",
    status: "completed",
    priority: "urgent",
    dueDate: "2024-03-16",
    notes: "Firebase Cloud Messaging integration",
  },
  {
    id: "TASK-021",
    title: "Chat Support Module",
    assignee: "Noah Wilson",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-27",
    notes: "Real-time chat using WebSockets",
  },
  {
    id: "TASK-022",
    title: "Upgrade Node.js Version",
    assignee: "Emma Stone",
    status: "pending",
    priority: "medium",
    dueDate: "2024-04-03",
    notes: "Test compatibility with existing dependencies",
  },
  {
    id: "TASK-023",
    title: "Fix Image Upload Bug",
    assignee: "Harsh Sharma",
    status: "completed",
    priority: "low",
    dueDate: "2024-03-21",
    notes: "Issue occurred due to incorrect MIME validation",
  },
  {
    id: "TASK-024",
    title: "Email Template Redesign",
    assignee: "Chloe Bennet",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-03-30",
    notes: "Modernize transactional email design",
  },
  {
    id: "TASK-025",
    title: "Improve SEO Metadata",
    assignee: "Rishi Verma",
    status: "pending",
    priority: "low",
    dueDate: "2024-04-05",
    notes: "Update title tags, descriptions, and OpenGraph data",
  },
  {
    id: "TASK-026",
    title: "Implement Two-Factor Authentication",
    assignee: "Li Wei",
    status: "blocked",
    priority: "high",
    dueDate: "2024-03-28",
    notes: "Waiting for SMS provider onboarding",
  },
  {
    id: "TASK-027",
    title: "Caching System Upgrade",
    assignee: "Grace Park",
    status: "in-progress",
    priority: "urgent",
    dueDate: "2024-03-26",
    notes: "Move from Redis 5 to Redis 7",
  },
  {
    id: "TASK-028",
    title: "Add File Preview Feature",
    assignee: "Raj Malhotra",
    status: "pending",
    priority: "medium",
    dueDate: "2024-04-01",
    notes: "Allow previewing PDFs and images in-browser",
  },
  {
    id: "TASK-029",
    title: "Remove Deprecated API Endpoints",
    assignee: "Emily Clark",
    status: "completed",
    priority: "low",
    dueDate: "2024-03-22",
    notes: "Cleanup legacy v1 endpoints",
  },
  {
    id: "TASK-030",
    title: "Implement Audit Trail Logs",
    assignee: "Hiro Tanaka",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-29",
    notes: "Track all user actions for compliance",
  },
];

function getStatusBadge(status: Task["status"]) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0 rounded"
        >
          Pending
        </Badge>
      );
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0 rounded"
        >
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0 rounded"
        >
          Completed
        </Badge>
      );
    case "blocked":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0 rounded"
        >
          Blocked
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

const TableFloat: React.FC = () => {
  const renderTaskRow = (task: Task) => {
    return (
      <TableRow key={task.id} className="hover:bg-muted/50 divide-x ring-0 border-0 shadow-none">
        <TableCell
          className="focus-visible:outline-none px-4 font-medium focus-visible:bg-muted cursor-pointer"
        >
          {task.title}
        </TableCell>
        <TableCell className="px-4 text-sm text-muted-foreground">
          {task.assignee}
        </TableCell>
        <TableCell className="px-4">
          {getStatusBadge(task.status)}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground">
          {task.dueDate}
        </TableCell>
        <TableCell className="px-4 max-w-[300px] text-sm text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block cursor-help truncate w-40">{task.notes}</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">{task.notes}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent divide-x border-y">
            <TableHead className="px-4 font-medium">Title</TableHead>
            <TableHead className="px-4 font-medium">Assignee</TableHead>
            <TableHead className="px-4 font-medium w-[120px]">
              Status
            </TableHead>

            <TableHead className="px-4 font-medium">Due Date</TableHead>
            <TableHead className="px-4 font-medium w-[80px]">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="!divide-y">{tasks.map(renderTaskRow)}</TableBody>
      </Table>
    </div>
  );
};

export default TableFloat;