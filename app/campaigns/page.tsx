"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { CampaignCard } from "@/components/campaigns/campaign-card";
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: string;
  budget: number;
  startDate: string;
  endDate: string;
  adAccountId: string;
}

export default function CampaignsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchCampaigns = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      toast.error("Failed to load campaigns");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage your marketing campaigns
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Icons.spinner className="h-6 w-6 animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <p className="text-muted-foreground">No campaigns found</p>
          <Button
            variant="link"
            className="mt-2"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create your first campaign
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={{
                ...campaign,
                startDate: new Date(campaign.startDate),
                endDate: new Date(campaign.endDate),
                budget: campaign.budget.toString(),
              }}
              onDelete={fetchCampaigns}
            />
          ))}
        </div>
      )}

      <CreateCampaignDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchCampaigns}
      />
    </div>
  );
} 