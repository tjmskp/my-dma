export interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: string;
  budget: string;
  startDate: Date;
  endDate: Date;
}

export interface ApiCampaign {
  id: string;
  name: string;
  objective: string;
  status: string;
  budget: number;
  startDate: string;
  endDate: string;
  adAccountId: string;
} 