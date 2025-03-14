"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { CampaignCard } from "@/components/campaigns/campaign-card";
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog";

export default function CampaignsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // This will be replaced with real data from your API
  const campaigns = [
    {
      id: "1",
      name: "Summer Sale 2024",
      objective: "conversions",
      status: "active",
      budget: 1000,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-06-30"),
      adAccountId: "1",
    },
    {
      id: "2",
      name: "Brand Awareness Q2",
      objective: "awareness",
      status: "scheduled",
      budget: 2500,
      startDate: new Date("2024-04-01"),
      endDate: new Date("2024-06-30"),
      adAccountId: "1",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage your marketing campaigns.
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Icons.add className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      <CreateCampaignDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
} 