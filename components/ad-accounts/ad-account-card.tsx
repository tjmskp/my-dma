"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface AdAccountCardProps {
  account: {
    id: string;
    platform: string;
    name: string;
    accountId: string;
    status: string;
  };
}

export function AdAccountCard({ account }: AdAccountCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {account.name}
        </CardTitle>
        <Icons.creditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">
              Platform
            </div>
            <div className="font-medium capitalize">
              {account.platform}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">
              Account ID
            </div>
            <div className="font-medium">
              {account.accountId}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge
              variant={account.status === "active" ? "default" : "secondary"}
            >
              {account.status}
            </Badge>
            <Button variant="ghost" size="sm">
              <Icons.settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 