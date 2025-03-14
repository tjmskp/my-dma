"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { AdAccountCard } from "@/components/ad-accounts/ad-account-card";
import { ConnectAccountDialog } from "@/components/ad-accounts/connect-account-dialog";

export default function AdAccountsPage() {
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);

  // This will be replaced with real data from your API
  const accounts = [
    {
      id: "1",
      platform: "meta",
      name: "Meta Ads Account",
      accountId: "123456789",
      status: "active",
    },
    {
      id: "2",
      platform: "google",
      name: "Google Ads Account",
      accountId: "987654321",
      status: "active",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ad Accounts</h1>
          <p className="text-muted-foreground">
            Connect and manage your advertising platform accounts.
          </p>
        </div>
        <Button onClick={() => setIsConnectDialogOpen(true)}>
          <Icons.add className="mr-2 h-4 w-4" />
          Connect Account
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <AdAccountCard key={account.id} account={account} />
        ))}
      </div>

      <ConnectAccountDialog
        open={isConnectDialogOpen}
        onOpenChange={setIsConnectDialogOpen}
      />
    </div>
  );
} 