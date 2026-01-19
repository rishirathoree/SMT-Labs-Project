import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AssignedPerson {
  name: string;
  initials: string;
}

interface CustomerItem {
  id: string;
  customerName: string;
  purchaseAmount: string;
  lastPurchase: string;
  assigned: AssignedPerson[];
  status: string;
}


type StatusVariant = 'success' | 'warning' | 'default' | 'secondary';

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-indigo-500',
];

function getAvatarColor(initials: string) {
  const seed = initials
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[seed % avatarColors.length];
}

function AvatarStack({ people }: { people: AssignedPerson[] }) {
  return (
    <div className="flex -space-x-2">
      {people.map((person, index) => (
        <Avatar
          key={index}
          className={cn(
            'h-6 w-6 border-2 border-background text-[10px]',
            getAvatarColor(person.initials)
          )}
        >
          <AvatarFallback
            className={cn('font-medium text-white', getAvatarColor(person.initials))}
          >
            {person.initials}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

const statusStyles: Record<StatusVariant, { badge: string; dot: string }> = {
  success: {
    badge:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  warning: {
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  default: {
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  secondary: {
    badge: 'bg-muted text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
};

function StatusBadge({
  status,
  variant = 'default',
}: {
  status: string;
  variant?: StatusVariant;
}) {
  const styles = statusStyles[variant];
  return (
    <Badge variant="outline" className={cn('gap-1.5 rounded-full', styles.badge)}>
      <span className={cn('size-1.5 rounded-full', styles.dot)} aria-hidden="true" />
      {status}
    </Badge>
  );
}

const data: CustomerItem[] = [
  {
        id: '1',
        customerName: 'Amit Verma',
        purchaseAmount: '$12,500',
        lastPurchase: 'Nov 28, 2024',
        assigned: [
          { name: 'Riya Mehta', initials: 'RM' },
          { name: 'John Carter', initials: 'JC' },
        ],
        status: 'Active',
      },
      {
        id: '2',
        customerName: 'Sarah Williams',
        purchaseAmount: '$8,900',
        lastPurchase: 'Dec 03, 2024',
        assigned: [{ name: 'Aman Kapoor', initials: 'AK' }],
        status: 'VIP',
      },
      {
        id: '3',
        customerName: 'Michael Johnson',
        purchaseAmount: '$3,700',
        lastPurchase: 'Oct 20, 2024',
        assigned: [{ name: 'Priya Sen', initials: 'PS' }],
        status: 'Active',
      },
      {
        id: '4',
        customerName: 'Emily Davis',
        purchaseAmount: '$1,200',
        lastPurchase: 'Aug 15, 2024',
        assigned: [
          { name: 'Chris Paul', initials: 'CP' },
          { name: 'Nina Shah', initials: 'NS' },
        ],
        status: 'Pending',
      },
      {
        id: '5',
        customerName: 'Rohit Sharma',
        purchaseAmount: '$0',
        lastPurchase: '-',
        assigned: [{ name: 'Kunal Singh', initials: 'KS' }],
        status: 'Pending',
      },
      {
        id: '6',
        customerName: 'Jessica Lee',
        purchaseAmount: '$0',
        lastPurchase: '-',
        assigned: [{ name: 'Neha Gupta', initials: 'NG' }],
        status: 'Pending',
      },
      {
        id: '7',
        customerName: 'Anil Kumar',
        purchaseAmount: '$450',
        lastPurchase: 'Feb 10, 2024',
        assigned: [{ name: 'Rahul Jain', initials: 'RJ' }],
        status: 'Inactive',
      },
      {
        id: '8',
        customerName: 'Lisa Brown',
        purchaseAmount: '$600',
        lastPurchase: 'Mar 5, 2024',
        assigned: [
          { name: 'Ananya Rao', initials: 'AR' },
          { name: 'Mohit Sharma', initials: 'MS' },
        ],
        status: 'Inactive',
      },
      {
        id: '9',
        customerName: 'TechNova Pvt Ltd',
        purchaseAmount: '$65,000',
        lastPurchase: 'Nov 20, 2024',
        assigned: [{ name: 'Devansh Mehra', initials: 'DM' }],
        status: 'Active',
      },
      {
        id: '10',
        customerName: 'Skyline Enterprises',
        purchaseAmount: '$120,000',
        lastPurchase: 'Dec 01, 2024',
        assigned: [
          { name: 'Harsh Patel', initials: 'HP' },
          { name: 'Zara Khan', initials: 'ZK' },
        ],
        status: 'VIP',
      },
];


function getStatusVariant(status: string): StatusVariant {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Pending':
      return 'default';
    case 'Inactive':
      return 'secondary';
    case 'VIP':
      return 'warning';
    default:
      return 'default';
  }
}

export default function Table04() {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 font-medium">Task</TableHead>
            <TableHead className="font-medium">Budget</TableHead>
            <TableHead className="font-medium">Deadline</TableHead>
            <TableHead className="font-medium">Assigned</TableHead>
            <TableHead className="w-28 font-medium">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.customerName}</TableCell>
                  <TableCell>{item.purchaseAmount}</TableCell>
                  <TableCell>{item.lastPurchase}</TableCell>
                  <TableCell>
                    <AvatarStack people={item.assigned} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={item.status}
                      variant={getStatusVariant(item.status)}
                    />
                  </TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}