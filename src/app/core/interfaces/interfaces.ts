// career programes tabMenuList
export interface TabMenuList {
  label: string;
}

export interface mockDetails {
  name: string;
  description: string;
  start: string;
  end: string;
  status: string;
}

// carrier Programme
export interface Programme {
  id: number;
  userId: number;
  name: string;
  description: string;
  requirements: string[];
  requiredBadges: string[];
  optionalBadges: string[];
  startDate: Date;
  endDate: Date;
  status: string;
  changeHistory?: ChangeHistory[];
}

export interface ChangeHistory {
  id: number;
  programs: string;
  changeTimestamp: Date;
  changeDescription: string;
}

export interface Country {
  name: string;
  flag: string;
}


export interface Status {
  label: string;
}

export interface mockData  {
  name: string
  date: Date
}

