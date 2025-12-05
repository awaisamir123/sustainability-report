import { 
  users, type User, type InsertUser,
  organizations, type Organization, type InsertOrganization,
  emissionsData, type EmissionsData, type InsertEmissionsData,
  resourceConsumption, type ResourceConsumption, type InsertResourceConsumption,
  reports, type Report, type InsertReport,
  activities, type Activity, type InsertActivity 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  
  // Organization operations
  getOrganization(id: number): Promise<Organization | undefined>;
  createOrganization(org: InsertOrganization): Promise<Organization>;
  updateOrganization(id: number, orgData: Partial<Organization>): Promise<Organization | undefined>;
  listOrganizations(): Promise<Organization[]>;
  
  // Emissions data operations
  getEmissionsData(id: number): Promise<EmissionsData | undefined>;
  createEmissionsData(data: InsertEmissionsData): Promise<EmissionsData>;
  listEmissionsData(orgId: number): Promise<EmissionsData[]>;
  getEmissionsDataByPeriod(orgId: number, year: number, month?: number): Promise<EmissionsData[]>;
  
  // Resource consumption operations
  getResourceConsumption(id: number): Promise<ResourceConsumption | undefined>;
  createResourceConsumption(data: InsertResourceConsumption): Promise<ResourceConsumption>;
  listResourceConsumption(orgId: number, resourceType?: string): Promise<ResourceConsumption[]>;
  getResourceConsumptionByPeriod(orgId: number, year: number, month?: number): Promise<ResourceConsumption[]>;
  
  // Report operations
  getReport(id: number): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  updateReportStatus(id: number, status: string): Promise<Report | undefined>;
  listReports(orgId: number): Promise<Report[]>;
  
  // Activity operations
  createActivity(activity: InsertActivity): Promise<Activity>;
  listActivities(orgId: number, limit?: number): Promise<Activity[]>;
  
  // Session store for authentication
  sessionStore?: any;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private organizations: Map<number, Organization>;
  private emissionsData: Map<number, EmissionsData>;
  private resourceConsumptions: Map<number, ResourceConsumption>;
  private reports: Map<number, Report>;
  private activities: Map<number, Activity>;
  
  // Session store for authentication
  public sessionStore: session.Store;
  
  // IDs for auto-increment
  private userId: number;
  private orgId: number;
  private emissionsId: number;
  private resourceId: number;
  private reportId: number;
  private activityId: number;

  constructor() {
    this.users = new Map();
    this.organizations = new Map();
    this.emissionsData = new Map();
    this.resourceConsumptions = new Map();
    this.reports = new Map();
    this.activities = new Map();
    
    // Initialize session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    this.userId = 1;
    this.orgId = 1;
    this.emissionsId = 1;
    this.resourceId = 1;
    this.reportId = 1;
    this.activityId = 1;
    
    // Initialize with sample user
    this.createUser({
      username: "demo",
      password: "demo123",  // Will be hashed in the auth.ts service
      displayName: "Demo User",
      role: "user",
      email: "demo@example.com"
    });
    
    // Seed with admin user
    this.createUser({
      username: "admin",
      password: "admin123",  // Will be hashed in the auth.ts service
      displayName: "Administrator",
      role: "admin",
      email: "admin@example.com"
    });
    
    // Seed with a super admin user
    this.createUser({
      username: "superadmin",
      password: "superadmin123",  // Will be hashed in the auth.ts service
      displayName: "Super Admin",
      role: "super_admin",
      email: "superadmin@example.com"
    });
    
    // Initialize with sample organization
    this.createOrganization({
      name: "Demo Company",
      industry: "Technology",
      size: "Medium"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
      servicesPurchased: insertUser.servicesPurchased || [],
      consultationsBooked: insertUser.consultationsBooked || []
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    // Handle special cases for arrays to ensure proper merging
    const servicesPurchased = userData.servicesPurchased 
      ? Array.isArray(userData.servicesPurchased) 
        ? userData.servicesPurchased 
        : [] 
      : user.servicesPurchased;
      
    const consultationsBooked = userData.consultationsBooked 
      ? Array.isArray(userData.consultationsBooked) 
        ? userData.consultationsBooked 
        : [] 
      : user.consultationsBooked;
    
    const updatedUser: User = {
      ...user,
      ...userData,
      servicesPurchased,
      consultationsBooked,
      id, // Ensure id doesn't change
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Organization operations
  async getOrganization(id: number): Promise<Organization | undefined> {
    return this.organizations.get(id);
  }

  async createOrganization(org: InsertOrganization): Promise<Organization> {
    const id = this.orgId++;
    const now = new Date();
    const organization: Organization = {
      ...org,
      id,
      createdAt: now
    };
    this.organizations.set(id, organization);
    return organization;
  }

  async updateOrganization(id: number, orgData: Partial<Organization>): Promise<Organization | undefined> {
    const organization = this.organizations.get(id);
    if (!organization) return undefined;
    
    const updatedOrg: Organization = {
      ...organization,
      ...orgData,
      id, // Ensure id doesn't change
      updatedAt: new Date()
    };
    this.organizations.set(id, updatedOrg);
    return updatedOrg;
  }

  async listOrganizations(): Promise<Organization[]> {
    return Array.from(this.organizations.values());
  }

  // Emissions data operations
  async getEmissionsData(id: number): Promise<EmissionsData | undefined> {
    return this.emissionsData.get(id);
  }

  async createEmissionsData(data: InsertEmissionsData): Promise<EmissionsData> {
    const id = this.emissionsId++;
    const now = new Date();
    const emissionData: EmissionsData = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.emissionsData.set(id, emissionData);
    
    // Create activity record
    await this.createActivity({
      organizationId: data.organizationId,
      activityType: "data_update",
      description: "Updated Emissions Data",
      details: { scope: "emissions", year: data.year, month: data.month },
      status: "completed",
      userId: data.createdBy
    });
    
    return emissionData;
  }

  async listEmissionsData(orgId: number): Promise<EmissionsData[]> {
    return Array.from(this.emissionsData.values())
      .filter(data => data.organizationId === orgId);
  }

  async getEmissionsDataByPeriod(orgId: number, year: number, month?: number): Promise<EmissionsData[]> {
    return Array.from(this.emissionsData.values())
      .filter(data => {
        if (data.organizationId !== orgId) return false;
        if (data.year !== year) return false;
        if (month && data.month !== month) return false;
        return true;
      });
  }

  // Resource consumption operations
  async getResourceConsumption(id: number): Promise<ResourceConsumption | undefined> {
    return this.resourceConsumptions.get(id);
  }

  async createResourceConsumption(data: InsertResourceConsumption): Promise<ResourceConsumption> {
    const id = this.resourceId++;
    const now = new Date();
    const resource: ResourceConsumption = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.resourceConsumptions.set(id, resource);
    
    // Create activity record
    await this.createActivity({
      organizationId: data.organizationId,
      activityType: "data_update",
      description: `Updated ${data.resourceType} Data`,
      details: { resourceType: data.resourceType, year: data.year, month: data.month },
      status: "completed",
      userId: data.createdBy
    });
    
    return resource;
  }

  async listResourceConsumption(orgId: number, resourceType?: string): Promise<ResourceConsumption[]> {
    return Array.from(this.resourceConsumptions.values())
      .filter(data => {
        if (data.organizationId !== orgId) return false;
        if (resourceType && data.resourceType !== resourceType) return false;
        return true;
      });
  }

  async getResourceConsumptionByPeriod(orgId: number, year: number, month?: number): Promise<ResourceConsumption[]> {
    return Array.from(this.resourceConsumptions.values())
      .filter(data => {
        if (data.organizationId !== orgId) return false;
        if (data.year !== year) return false;
        if (month && data.month !== month) return false;
        return true;
      });
  }

  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async createReport(report: InsertReport): Promise<Report> {
    const id = this.reportId++;
    const now = new Date();
    const newReport: Report = {
      ...report,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.reports.set(id, newReport);
    
    // Create activity record
    await this.createActivity({
      organizationId: report.organizationId,
      activityType: "report_generation",
      description: `Generated ${report.reportType} Report`,
      details: { reportName: report.reportName, reportType: report.reportType },
      status: "completed",
      userId: report.createdBy
    });
    
    return newReport;
  }

  async updateReportStatus(id: number, status: string): Promise<Report | undefined> {
    const report = this.reports.get(id);
    if (!report) return undefined;
    
    const updatedReport: Report = {
      ...report,
      status,
      updatedAt: new Date()
    };
    this.reports.set(id, updatedReport);
    
    return updatedReport;
  }

  async listReports(orgId: number): Promise<Report[]> {
    return Array.from(this.reports.values())
      .filter(report => report.organizationId === orgId);
  }

  // Activity operations
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.activityId++;
    const now = new Date();
    const newActivity: Activity = {
      ...activity,
      id,
      createdAt: now
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }

  async listActivities(orgId: number, limit = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.organizationId === orgId)
      .sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return 0;
      })
      .slice(0, limit);
  }
  
  private async seedInitialData() {
    try {
      // Create demo users with simple passwords for demo purposes only
      const demoUser = await this.createUser({
        username: "demo",
        password: "demo123",
        displayName: "Demo User",
        email: "demo@example.com",
        role: "user"
      });
      
      const adminUser = await this.createUser({
        username: "admin",
        password: "admin123",
        displayName: "Administrator",
        email: "admin@example.com",
        role: "admin"
      });
      
      // Create a demo organization
      const organization = await this.createOrganization({
        name: "Demo Company",
        industry: "Technology", 
        size: "Medium"
      });
      
      console.log("Initial demo data created successfully");
    } catch (error) {
      console.error("Error seeding initial data:", error);
    }
  }
}

export const storage = new MemStorage();
