import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableFramed() {
  const tableData = [
    { project: "Website Redesign", status: "Paid", team: "Frontend Team", amount: "$12,500" },
    { project: "Mobile App Launch", status: "Pending", team: "Backend Team", amount: "$9,800" },
    { project: "API Integration", status: "Paid", team: "DevOps Team", amount: "$7,300" },
    { project: "Dashboard UI", status: "Paid", team: "Design Team", amount: "$5,600" },
    { project: "Marketing Automation", status: "Pending", team: "Marketing Team", amount: "$8,400" },
    { project: "E-commerce Migration", status: "Paid", team: "Fullstack Team", amount: "$14,900" },
    { project: "Performance Optimization", status: "Paid", team: "Frontend Team", amount: "$6,200" },
    { project: "Cloud Setup", status: "Pending", team: "DevOps Team", amount: "$10,000" },
    { project: "SEO Overhaul", status: "Paid", team: "Marketing Team", amount: "$4,700" },
    { project: "Content Management System", status: "Paid", team: "Backend Team", amount: "$11,300" },
    { project: "User Authentication", status: "Pending", team: "Security Team", amount: "$6,800" },
    { project: "Chatbot Development", status: "Paid", team: "AI Team", amount: "$9,500" },
    { project: "Payment Gateway Integration", status: "Paid", team: "Backend Team", amount: "$12,000" },
    { project: "Landing Page A/B Test", status: "Pending", team: "Design Team", amount: "$3,900" },
    { project: "Email Template Design", status: "Paid", team: "Design Team", amount: "$2,100" },
    { project: "Analytics Setup", status: "Pending", team: "Data Team", amount: "$7,700" },
    { project: "Server Migration", status: "Paid", team: "DevOps Team", amount: "$10,400" },
    { project: "UI Kit Creation", status: "Paid", team: "Design Team", amount: "$5,900" },
    { project: "Bug Fix Sprint", status: "Pending", team: "QA Team", amount: "$4,500" },
    { project: "Cross-Platform Testing", status: "Paid", team: "QA Team", amount: "$6,100" },
  ];

  return (
    <>
      <Table className="ring ring-slate-100">
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => {
                return (
                  <TableRow
                  className="cursor-pointer"
                  key={index}>
                    <TableCell className="font-medium">{row.project}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <span
                          className="size-1.5 rounded-full bg-emerald-500"
                          aria-hidden="true"
                        />
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.team}</TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Budget</TableCell>
                <TableCell className="text-right font-medium">$39,550</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
    </>
  )
}