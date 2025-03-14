import {
  AlertTriangle,
  ArrowRight,
  BarChart,
  Bot,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Edit,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LogOut,
  LucideProps,
  Moon,
  MoreVertical,
  Play,
  Plus,
  Pizza,
  Rocket,
  Settings,
  SunMedium,
  Target,
  Trash,
  TrendingUp,
  Twitter,
  User,
  Users,
  X,
} from "lucide-react";

import { FC } from "react";

export type Icon = FC<LucideProps>;

export const Icons = {
  logo: Rocket,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  creditCard: CreditCard,
  rocket: Rocket,
  image: Image,
  dollarSign: DollarSign,
  logout: LogOut,
  play: Play,
  calendar: Calendar,
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
  plus: Plus,
  edit: Edit,
  barChart: BarChart,
  target: Target,
  trendingUp: TrendingUp,
  users: Users,
  file: File,
  fileText: FileText,
  moreVertical: MoreVertical,
  bot: Bot,
} as const; 