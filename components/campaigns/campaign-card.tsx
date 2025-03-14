"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteCampaignDialog } from "./delete-campaign-dialog";
import { Campaign } from "@/types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
  onDelete?: () => void;
}

export function CampaignCard({ campaign, onDelete }: CampaignCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {campaign.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <Icons.settings className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  // TODO: Implement edit functionality
                }}
              >
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setShowDeleteDialog(true);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Icons.trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Objective</span>
              <span className="text-sm font-medium capitalize">
                {campaign.objective}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Budget</span>
              <span className="text-sm font-medium">
                ${campaign.budget}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="text-sm font-medium">
                {format(campaign.startDate, "MMM d")} -{" "}
                {format(campaign.endDate, "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Badge
                variant={campaign.status === "active" ? "default" : "secondary"}
              >
                {campaign.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteCampaignDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        campaignId={campaign.id}
        campaignName={campaign.name}
        onSuccess={onDelete}
      />
    </>
  );
} 